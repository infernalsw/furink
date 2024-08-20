import { Injectable, Logger } from "@nestjs/common";
import { Client as MinioClient } from "minio";

import { ConfigService } from "./config.service";

@Injectable()
export class MinioService extends MinioClient {
	private readonly logger = new Logger(MinioService.name);

	constructor(config: ConfigService) {
		super({
			endPoint: config.getOrThrow("minio.endpoint"),
			port: config.getOrThrow("minio.port"),
			useSSL: config.getOrThrow("minio.useSSL"),
			accessKey: config.getOrThrow("minio.accessKey"),
			secretKey: config.getOrThrow("minio.secretKey"),
		});
	}
}
