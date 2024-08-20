import { Injectable, Logger } from "@nestjs/common";
import { RedisClientType, createClient } from "redis";

import { ConfigService } from "./config.service";

@Injectable()
export class RedisService {
	/**
	 * The wrapped Redis client.
	 */

	private readonly client: RedisClientType;

	/**
	 * The logger instance.
	 */
	private readonly logger = new Logger(RedisService.name);

	constructor(config: ConfigService) {
		this.client = createClient({
			url: config.get("redis.url"),
		});
	}

	async onModuleInit() {
		await this.client.connect();
		await this.client.ping();
		this.logger.log("Connected to Redis.");
	}
}
