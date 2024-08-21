import { Injectable } from "@nestjs/common";
import { PostReply, Prisma } from "@prisma/client";
import { ResultAsync } from "neverthrow";
import { PrismaError, PrismaService } from "src/common";

@Injectable()
export class PostReplyService {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Find a single post.
	 * @param where
	 * @returns
	 */
	findOne(where: Prisma.PostReplyWhereUniqueInput): ResultAsync<PostReply | null, Error> {
		return ResultAsync.fromPromise(
			this.prisma.postReply.findUnique({
				where,
			}),
			(err) => err as PrismaError
		);
	}

	/**
	 * Find many posts.
	 * @param params
	 * @returns
	 */
	findMany(params: Prisma.PostReplyFindManyArgs): ResultAsync<PostReply[], Error> {
		return ResultAsync.fromPromise<PostReply[], Error>(
			this.prisma.postReply.findMany(params),
			(err) => err as Error
		);
	}

	/**
	 * Create a post.
	 * @param data
	 * @returns
	 */
	create(data: Prisma.PostReplyCreateInput): ResultAsync<PostReply, Error> {
		return ResultAsync.fromPromise<PostReply, Error>(
			this.prisma.postReply.create({
				data,
			}),
			(err) => err as Error
		);
	}

	/**
	 * Update a post.
	 * @param where
	 * @param data
	 * @returns
	 */
	update(
		where: Prisma.PostReplyWhereUniqueInput,
		data: Prisma.PostReplyUpdateInput
	): ResultAsync<PostReply, Error> {
		return ResultAsync.fromPromise<PostReply, Error>(
			this.prisma.postReply.update({
				where,
				data,
			}),
			(err) => err as Error
		);
	}

	/**
	 * Delete a post.
	 * @param where
	 * @returns
	 */
	delete(where: Prisma.PostReplyWhereUniqueInput): ResultAsync<PostReply, Error> {
		return ResultAsync.fromPromise<PostReply, Error>(
			this.prisma.postReply.delete({
				where,
			}),
			(err) => err as Error
		);
	}

	/**
	 * Count posts.
	 * @param params
	 * @returns
	 */
	count(params: Prisma.PostReplyCountArgs): ResultAsync<number, Error> {
		return ResultAsync.fromPromise<number, Error>(
			this.prisma.postReply.count(params),
			(err) => err as Error
		);
	}
}
