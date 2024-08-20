import { Global, Module } from "@nestjs/common";

import { AgendaService } from "./providers/agenda.service";
import { ConfigService } from "./providers/config.service";
import { MinioService } from "./providers/minio.service";
import { PrismaService } from "./providers/prisma.service";

@Module({
	providers: [ConfigService, PrismaService, MinioService, AgendaService],
	exports: [ConfigService, PrismaService, MinioService, AgendaService],
})
@Global()
export class CommonModule {}
