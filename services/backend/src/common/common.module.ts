import { Global, Module } from "@nestjs/common";

import { ConfigService } from "./providers/config.service";
import { PrismaService } from "./providers/prisma.service";

@Module({
	providers: [ConfigService, PrismaService],
	exports: [ConfigService, PrismaService],
})
@Global()
export class CommonModule {}
