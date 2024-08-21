import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";

import { IntegrationService } from "./integration.service";

@Module({
	imports: [UserModule],
	providers: [IntegrationService],
	exports: [IntegrationService],
})
export class IntegrationModule {}
