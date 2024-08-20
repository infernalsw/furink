import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CommonModule } from "./common/common.module";
import { loadConfiguration } from "./config";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot({ load: [loadConfiguration] }),
		CommonModule,
		UserModule,
		PostModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
