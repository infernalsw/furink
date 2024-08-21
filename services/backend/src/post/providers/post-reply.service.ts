import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/providers/prisma.service";

@Injectable()
export class PostReplyService {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Find a single post.
	 * @param where
	 * @returns
	 */
	findOne(where: Prisma.PostReplyWhereUniqueInput) {
		return this.prisma.postReply.findUnique({
			where,
		});
	}

	/**
	 * Find many posts.
	 * @param params
	 * @returns
	 */
	findMany(params: Prisma.PostReplyFindManyArgs) {
		return this.prisma.postReply.findMany(params);
	}

	/**
	 * Create a post.
	 * @param data
	 * @returns
	 */
	create(data: Prisma.PostReplyCreateInput) {
		return this.prisma.postReply.create({
			data,
		});
	}

	/**
	 * Update a post.
	 * @param where
	 * @param data
	 * @returns
	 */
	update(where: Prisma.PostReplyWhereUniqueInput, data: Prisma.PostReplyUpdateInput) {
		return this.prisma.postReply.update({
			where,
			data,
		});
	}

	/**
	 * Delete a post.
	 * @param where
	 * @returns
	 */
	delete(where: Prisma.PostReplyWhereUniqueInput) {
		return this.prisma.postReply.delete({
			where,
		});
	}

	/**
	 * Count posts.
	 * @param params
	 * @returns
	 */
	count(params: Prisma.PostReplyCountArgs) {
		return this.prisma.postReply.count(params);
	}
}
