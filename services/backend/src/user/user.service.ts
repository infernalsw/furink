/* eslint-disable @typescript-eslint/naming-convention */
import { UserQuery } from "@furinkapp/models";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { Result, ResultAsync, ok } from "neverthrow";
import { PrismaError, PrismaService, SupabaseService, TypesenseService } from "src/common";

import { UserDocument } from "./types/user-document.type";

@Injectable()
export class UserService implements OnModuleInit {
	constructor(
		private readonly prisma: PrismaService,
		private readonly typesense: TypesenseService,
		private readonly supabase: SupabaseService
	) {}

	onModuleInit() {
		this.typesense.registerCollection({
			name: "users",
			fields: [
				{
					name: "id",
					type: "string",
				},
				{
					name: "username",
					type: "string",
				},
				{
					name: "displayName",
					type: "string",
				},
			],
		});
	}

	/**
	 * Find a single user.
	 * @param where
	 * @returns
	 */
	async findOne(where: Prisma.UserWhereUniqueInput): Promise<Result<User | null, PrismaError>> {
		return ResultAsync.fromPromise(
			this.prisma.user.findUnique({
				where,
			}),
			(err) => err as PrismaError
		);
	}

	/**
	 * Find many users.
	 * @param params
	 * @returns
	 */
	findMany(params: Prisma.UserFindManyArgs): ResultAsync<User[], PrismaError> {
		return ResultAsync.fromPromise(this.prisma.user.findMany(params), (err) => err as PrismaError);
	}

	/**
	 * Create a user.
	 * @param data
	 * @returns
	 */
	create(data: Prisma.UserCreateInput): ResultAsync<User, PrismaError> {
		return ResultAsync.fromPromise(
			this.prisma.user.create({
				data,
			}),
			(err) => err as PrismaError
		);
	}

	/**
	 * Update a user.
	 * @param where
	 * @param data
	 * @returns
	 */
	update(
		where: Prisma.UserWhereUniqueInput,
		data: Prisma.UserUpdateInput
	): ResultAsync<User | null, PrismaError> {
		return ResultAsync.fromPromise(
			this.prisma.user.update({
				where,
				data,
			}),
			(err) => err as PrismaError
		);
	}

	/**
	 * Delete a user.
	 * @param where
	 * @returns
	 */
	delete(where: Prisma.UserWhereUniqueInput): ResultAsync<User | null, PrismaError> {
		return ResultAsync.fromPromise(
			this.prisma.user.delete({
				where,
			}),
			(err) => err as PrismaError
		);
	}

	/**
	 * Count posts.
	 * @param params
	 * @returns
	 */
	count(params: Prisma.PostCountArgs): ResultAsync<number, PrismaError> {
		return ResultAsync.fromPromise(this.prisma.post.count(params), (err) => err as PrismaError);
	}

	/**
	 * Search for users.
	 * @param query
	 * @returns
	 */
	async search(query: UserQuery): Promise<Result<User[], Error>> {
		const searches = [];
		if (query.username !== undefined) {
			searches.push({
				collection: "users",
				q: query.username,
			});
		}
		if (query.displayName !== undefined) {
			searches.push({
				collection: "users",
				q: query.displayName,
			});
		}
		if (searches.length === 0) {
			return ok([]);
		}

		return ResultAsync.fromPromise(
			this.typesense.multiSearch.perform<UserDocument[]>({
				searches,
			}),
			(error) => error as Error
		).andThen((response) => {
			const ids = response.results
				.filter((result) => result.hits !== undefined)
				// checked above
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				.flatMap((result) => result.hits!)
				.map((hit) => hit.document.id);

			return this.findMany({ where: { id: { in: ids } } });
		});
	}
}
