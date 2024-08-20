import { Global, Module } from "@nestjs/common";

import { ConfigService } from "./providers/config.service";
import { MinioService } from "./providers/minio.service";
import { PrismaService } from "./providers/prisma.service";

@Module({
	providers: [ConfigService, PrismaService, MinioService],
	exports: [ConfigService, PrismaService, MinioService],
})
@Global()
export class CommonModule {}
