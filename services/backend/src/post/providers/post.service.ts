import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../../common/providers/prisma.service";

@Injectable()
export class PostService {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Find a single post.
	 * @param where
	 * @returns
	 */
	findOne(where: Prisma.PostWhereUniqueInput) {
		return this.prisma.post.findUnique({
			where,
		});
	}

	/**
	 * Find many posts.
	 * @param params
	 * @returns
	 */
	findMany(params: Prisma.PostFindManyArgs) {
		return this.prisma.post.findMany(params);
	}

	/**
	 * Create a post.
	 * @param data
	 * @returns
	 */
	create(data: Prisma.PostCreateInput) {
		return this.prisma.post.create({
			data,
		});
	}

	/**
	 * Update a post.
	 * @param where
	 * @param data
	 * @returns
	 */
	update(where: Prisma.PostWhereUniqueInput, data: Prisma.PostUpdateInput) {
		return this.prisma.post.update({
			where,
			data,
		});
	}

	/**
	 * Delete a post.
	 * @param where
	 * @returns
	 */
	delete(where: Prisma.PostWhereUniqueInput) {
		return this.prisma.post.delete({
			where,
		});
	}

	/**
	 * Count posts.
	 * @param params
	 * @returns
	 */
	count(params: Prisma.PostCountArgs) {
		return this.prisma.post.count(params);
	}
}
