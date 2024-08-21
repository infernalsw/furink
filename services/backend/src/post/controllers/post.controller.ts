import { Controller, Get, NotFoundException } from "@nestjs/common";

import { PostService } from "../providers/post.service";

@Controller("posts")
export class PostController {
	constructor(private readonly posts: PostService) {}

	@Get("/:id")
	async getPost(id: string) {
		const post = await this.posts.findOne({ id });
		if (post === null) {
			throw new NotFoundException();
		}
		return post;
	}
}
