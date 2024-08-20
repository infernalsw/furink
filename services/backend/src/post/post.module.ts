import { Module } from "@nestjs/common";

import { PostController } from "./controllers/post.controller";
import { PostService } from "./post.service";

@Module({
	providers: [PostService],
	controllers: [PostController],
	exports: [PostService],
})
export class PostModule {}
