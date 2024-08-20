import { Logger } from "@nestjs/common";
import { RedisClientType, createClient } from "redis";

import { ConfigService } from "./config.service";

export class RedisService {
	/**
	 * The wrapped Redis client.
	 */

	private readonly client: RedisClientType;

	/**
	 * The logger instance.
	 */
	private readonly logger = new Logger(RedisService.name);

	constructor(private readonly config: ConfigService) {
		this.client = createClient({
			url: this.config.get("redis.url"),
		});
	}

	async onModuleInit() {
		this.logger.log("Connecting to Redis...");
		await this.client.connect();
		await this.client.ping();
		this.logger.log("Connected to Redis.");
	}
}
