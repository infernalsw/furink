use std::{error::Error, io::ErrorKind, path::PathBuf};

use clap::Parser;
use futures_util::{io, StreamExt, TryStreamExt};
use minio::s3::{
    args::{PutObjectApiArgs, PutObjectArgs},
    client::ClientBuilder,
    creds::StaticProvider,
};
use serde::Deserialize;
use tracing::{info, level_filters::LevelFilter};

#[derive(Deserialize)]
struct Config {
    pub access_key: String,
    pub secret_key: String,
}

#[derive(Parser)]
struct Args {
    export_url: String,
    bucket_url: String,
    #[clap(default_value = "config.toml")]
    config: PathBuf,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let Args {
        config,
        export_url,
        bucket_url,
    } = Args::parse();

    // initialize logging
    tracing_subscriber::fmt()
        .json()
        .with_max_level(LevelFilter::INFO)
        .init();

    // read config
    let Config {
        access_key,
        secret_key,
    } = toml::from_str(&std::fs::read_to_string(&config)?)?;

    // setup s3 client
    let provider = StaticProvider::new(&access_key, &secret_key, None);
    let client = ClientBuilder::new(bucket_url.parse()?)
        .provider(Some(Box::new(provider)))
        .build()?;

    // open stream to export file
    let stream = reqwest::get(&export_url)
        .await?
        .bytes_stream()
        .map_err(|e| io::Error::new(ErrorKind::Other, e))
        .into_async_read();

    // create gzip reader
    let mut reader = async_compression::futures::bufread::GzipDecoder::new(stream);
    let mut reader = csv_async::AsyncReader::from_reader(&mut reader);

    let _ = reader
        .records()
        .filter_map(|record| async { record.ok() })
        .filter(|record| {
            // stupid hack to allow sync filter
            let deleted = record.get(20).map(|deleted| deleted == "t").unwrap_or(true);
            let has_md5 = record.get(3).is_some();
            async move { !deleted && has_md5 }
        })
        .map(|record| {
            tokio::task::spawn({
                let client = client.clone();
                async move {
                    let id = record.get(0).unwrap();
                    let md5 = record.get(3).unwrap();
                    let rating = record.get(5).unwrap();
                    let ext = record.get(11).unwrap();

                    let url = format!(
                        "https://static1.e621.net/data/{}/{}/{}.{}",
                        &md5[0..2],
                        &md5[2..4],
                        &md5,
                        &ext
                    );

                    info!(id, url, "syncing to s3");
                }
            })
        })
        .take(4)
        .buffered(8)
        .try_collect::<()>()
        .await;

    Ok(())
}
