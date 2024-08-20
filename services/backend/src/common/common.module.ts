import { Global, Module } from "@nestjs/common";

import { AgendaService } from "./providers/agenda.service";
import { ConfigService } from "./providers/config.service";
import { MinioService } from "./providers/minio.service";
import { PrismaService } from "./providers/prisma.service";
import { TypesenseService } from "./providers/typesense.service";

@Module({
	providers: [ConfigService, PrismaService, MinioService, AgendaService, TypesenseService],
	exports: [ConfigService, PrismaService, MinioService, AgendaService, TypesenseService],
})
@Global()
export class CommonModule {}
