import { Global, Module } from "@nestjs/common";

import * as providers from "./providers";

@Module({
	providers: Object.values(providers),
	exports: Object.values(providers),
})
@Global()
export class CommonModule {}
