import { Injectable } from "@nestjs/common";
import { Client as TypesenseClient } from "typesense";

import { ConfigService } from "./config.service";

@Injectable()
export class TypesenseService extends TypesenseClient {
	constructor(private readonly config: ConfigService) {
		super({
			apiKey: config.getOrThrow("typesense.apiKey"),
			nodes: [
				{
					host: config.getOrThrow("typesense.host"),
					port: config.getOrThrow("typesense.port"),
					protocol: "http",
				},
			],
		});
	}
}
