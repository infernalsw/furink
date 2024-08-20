export interface Config {
	typesense: {
		host: string;
		port: number;
		apiKey: string;
	};
	minio: {
		endpoint: string;
		port: number;
		useSSL: boolean;
		accessKey?: string;
		secretKey?: string;
	};
}
