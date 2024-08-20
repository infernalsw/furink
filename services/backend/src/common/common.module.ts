import { Global, Module } from "@nestjs/common";

import { ConfigService } from "./providers/config.service";

@Module({
	providers: [ConfigService],
	exports: [ConfigService],
})
@Global()
export class CommonModule {}
