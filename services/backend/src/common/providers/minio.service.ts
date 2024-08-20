import { Injectable } from "@nestjs/common";
import { Client as MinioClient } from "minio";

import { ConfigService } from "./config.service";

@Injectable()
export class MinioService extends MinioClient {
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
