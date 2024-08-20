import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { Client as TypesenseClient } from "typesense";
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

import { ConfigService } from "./config.service";

@Injectable()
export class TypesenseService extends TypesenseClient implements OnApplicationBootstrap {
	private readonly logger = new Logger(TypesenseService.name);

	/**
	 * A record of registered collections.
	 */
	private readonly registeredCollections: CollectionCreateSchema[] = [];

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

	registerCollection(schema: CollectionCreateSchema) {
		this.registeredCollections.push(schema);
		this.logger.log(`Registered  collection: ${schema.name}`);
	}

	async onApplicationBootstrap() {
		this.logger.log("Validating collections...");
		const existingCollections = await this.collections().retrieve();
		// iterate over registered collections and create them if they don't exist
		for (const schema of this.registeredCollections) {
			// skip if collection exists
			const existingCollection = existingCollections.find((c) => c.name === schema.name);
			if (existingCollection) {
				// validate schema
				schema.fields?.forEach((field) => {
					const existingField = existingCollection.fields?.find((f) => f.name === field.name);
					if (!existingField) {
						this.logger.warn(`Field ${field.name} missing in collection ${schema.name}`);
					}
					if (existingField?.type !== field.type) {
						this.logger.warn(`Field ${field.name} type mismatch in collection ${schema.name}`);
					}
				});
				continue;
			}
			this.logger.log(`Creating collection: ${schema.name}`);
			await this.collections().create(schema);
		}
		this.logger.log("Collections validated.");
	}
}
