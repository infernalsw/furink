import { z } from "zod";

export const PostCommentSchema = z.object({
	author: z.string(),
	content: z.string(),
});

export type PostComment = z.infer<typeof PostCommentSchema>;

/**
 * Post Schema
 */
export const PostSchema = z.object({
	title: z.string(),
	content: z.string(),
	author: z.string(),
	likes: z.number().default(0),
	// 1 to 10 comments - more must be paginated
	comments: z.array(PostCommentSchema).max(10),
});

export type Post = z.infer<typeof PostSchema>;
