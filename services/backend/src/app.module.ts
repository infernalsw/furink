import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CommonModule } from "./common/common.module";

@Module({
	imports: [ConfigModule, CommonModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
