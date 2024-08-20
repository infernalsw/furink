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
	agenda: {
		endpoint: string;
	};
	redis: {
		url: string;
	};
	gorse: {
		endpoint: string;
	};
	supabase: {
		url: string;
		key: string;
	};
}
