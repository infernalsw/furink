import { Body, Controller, Get, NotFoundException, Param, Post, Query } from "@nestjs/common";

import { PostReplyService } from "../providers/post-reply.service";
import { PostService } from "../providers/post.service";

@Controller("posts/:postId/replies")
export class PostReplyController {
	constructor(
		private readonly posts: PostService,
		private readonly replies: PostReplyService
	) {}

	@Get("/")
	async getReplies(@Param("postId") postId: string, @Query("page") page: number) {
		const posts = await this.replies.findMany({
			where: {
				parentId: postId,
			},
			take: 100,
			skip: page * 100,
		});
		return posts;
	}

	@Post("/")
	async createReply(@Param("postId") postId: string, @Body() body: { content: string }) {
		const post = await this.posts.findOne({ id: postId });
		if (post === null) {
			throw new NotFoundException();
		}
		const reply = await this.replies.create({
			content: body.content,
			author: {
				connect: {
					id: "",
				},
			},
			parent: {
				connect: {
					id: postId,
				},
			},
		});
		return reply;
	}
}
