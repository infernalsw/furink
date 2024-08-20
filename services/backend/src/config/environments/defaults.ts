import { Config } from "../config.interface";

export const defaults: Config = {
	typesense: {
		host: process.env.TYPESENSE_HOST ?? "localhost",
		port: parseInt(process.env.TYPESENSE_PORT ?? "8108"),
		apiKey: process.env.TYPESENSE_API_KEY ?? "admin",
	},
	minio: {
		endpoint: process.env.MINIO_ENDPOINT ?? "play.min.io",
		port: parseInt(process.env.MINIO_PORT ?? "9000"),
		useSSL: process.env.MINIO_USE_SSL === "true",
		accessKey: process.env.MINIO_ACCESS_KEY ?? "Q3AM3UQ867SPQQA43P2F",
		secretKey: process.env.MINIO_SECRET_KEY ?? "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
	},
	agenda: {
		endpoint: process.env.AGENDA_ENDPOINT ?? "mongodb://localhost:27017/agenda",
	},
	redis: {
		url: process.env.REDIS_URL ?? "redis://localhost:6379",
	},
	gorse: {
		endpoint: process.env.GORSE_ENDPOINT ?? "http://localhost:8086",
	},
};
