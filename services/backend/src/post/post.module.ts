import { Module } from "@nestjs/common";

import { PostController } from "./controllers/post.controller";
import { PostReplyService } from "./providers/post-reply.service";
import { PostService } from "./providers/post.service";

@Module({
	providers: [PostService, PostReplyService],
	controllers: [PostController],
	exports: [PostService, PostReplyService],
})
export class PostModule {}
