import { Global, Module } from "@nestjs/common";

import { AgendaService } from "./providers/agenda.service";
import { ConfigService } from "./providers/config.service";
import { GorseService } from "./providers/gorse.service";
import { MinioService } from "./providers/minio.service";
import { PrismaService } from "./providers/prisma.service";
import { RedisService } from "./providers/redis.service";
import { TypesenseService } from "./providers/typesense.service";

const providers = [
	AgendaService,
	ConfigService,
	GorseService,
	MinioService,
	PrismaService,
	RedisService,
	TypesenseService,
];

@Module({
	providers,
	exports: providers,
})
@Global()
export class CommonModule {}
