import { Injectable } from "@nestjs/common";
import { Post, Prisma } from "@prisma/client";
import { ResultAsync } from "neverthrow";
import { PrismaError } from "src/common";

import { PrismaService } from "../../common/providers/prisma.service";

@Injectable()
export class PostService {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Find a single post.
	 * @param where
	 * @returns
	 */
	findOne(where: Prisma.PostWhereUniqueInput): ResultAsync<Post | null, PrismaError> {
		return ResultAsync.fromPromise(
			this.prisma.post.findUnique({ where }),
			(error) => error as PrismaError
		);
	}

	/**
	 * Find many posts.
	 * @param params
	 * @returns
	 */
	findMany(params: Prisma.PostFindManyArgs): ResultAsync<Post[], PrismaError> {
		return ResultAsync.fromPromise(
			this.prisma.post.findMany(params),
			(error) => error as PrismaError
		);
	}

	/**
	 * Create a post.
	 * @param data
	 * @returns
	 */
	create(data: Prisma.PostCreateInput): ResultAsync<Post, PrismaError> {
		return ResultAsync.fromPromise(
			this.prisma.post.create({ data }),
			(error) => error as PrismaError
		);
	}

	/**
	 * Update a post.
	 * @param where
	 * @param data
	 * @returns
	 */
	update(
		where: Prisma.PostWhereUniqueInput,
		data: Prisma.PostUpdateInput
	): ResultAsync<Post, PrismaError> {
		return ResultAsync.fromPromise(
			this.prisma.post.update({ where, data }),
			(error) => error as PrismaError
		);
	}

	/**
	 * Delete a post.
	 * @param where
	 * @returns
	 */
	delete(where: Prisma.PostWhereUniqueInput): ResultAsync<Post, PrismaError> {
		return ResultAsync.fromPromise(
			this.prisma.post.delete({ where }),
			(error) => error as PrismaError
		);
	}

	/**
	 * Count posts.
	 * @param params
	 * @returns
	 */
	count(params: Prisma.PostCountArgs): ResultAsync<number, PrismaError> {
		return ResultAsync.fromPromise(this.prisma.post.count(params), (error) => error as PrismaError);
	}
}
