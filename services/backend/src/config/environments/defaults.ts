import { Config } from "../config.interface";

export const defaults: Config = {
	typesense: {
		host: process.env.TYPESENSE_HOST ?? "localhost",
		port: parseInt(process.env.TYPESENSE_PORT ?? "8108"),
		apiKey: process.env.TYPESENSE_API_KEY ?? "admin",
	},
};
