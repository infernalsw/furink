export interface Config {
	typesense: {
		host: string;
		port: number;
		apiKey: string;
	};
}

export type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>;
};
