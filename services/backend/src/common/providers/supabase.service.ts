import { Injectable } from "@nestjs/common";
import { AdminUserAttributes, AuthError, User, createClient } from "@supabase/supabase-js";
import { Result, err, ok } from "neverthrow";

import { ConfigService } from "./config.service";

@Injectable()
export class SupabaseService {
	private readonly supabase = createClient(
		this.config.getOrThrow("supabase.url"),
		this.config.getOrThrow("supabase.key"),
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		}
	);

	constructor(private readonly config: ConfigService) {}

	/**
	 * Fetches a user by their ID.
	 * @param uid The user's ID.
	 * @returns
	 */
	async getUserById(uid: string): Promise<Result<User | null, AuthError>> {
		const { data, error } = await this.supabase.auth.admin.getUserById(uid);
		if (error) {
			return err(error);
		}
		return ok(data.user);
	}

	/**
	 * This method lists all users.
	 * @param page The page number.
	 * @param perPage The number of users per page.
	 * @returns
	 */
	async listUsers(page = 1, perPage = 100): Promise<Result<User[] | null, AuthError>> {
		const { data, error } = await this.supabase.auth.admin.listUsers({
			page,
			perPage,
		});
		if (error) {
			return err(error);
		}
		return ok(data.users);
	}

	/**
	 * Creates a new user.
	 * @param email The user's email.
	 * @param password The user's password.
	 * @returns
	 */
	async createUser(email: string, password: string): Promise<Result<User | null, AuthError>> {
		const { data, error } = await this.supabase.auth.signUp({
			email,
			password,
		});
		if (error) {
			return err(error);
		}
		return ok(data.user);
	}

	/**
	 * Deletes a user by their ID.
	 * @param uid The user's ID.
	 * @returns
	 */
	async deleteUser(uid: string): Promise<Result<User | null, AuthError>> {
		const { data, error } = await this.supabase.auth.admin.deleteUser(uid);
		if (error) {
			return err(error);
		}
		return ok(data.user);
	}

	/**
	 * Updates a user by their ID.
	 * @param uid The user's ID.
	 * @param attributes The user's attributes.
	 * @returns
	 */
	async updateUserById(
		uid: string,
		attributes: AdminUserAttributes
	): Promise<Result<User | null, AuthError>> {
		const { data, error } = await this.supabase.auth.admin.updateUserById(uid, attributes);
		if (error) {
			return err(error);
		}
		return ok(data.user);
	}

	/**
	 * Fetches a user from a JWT token.
	 * @param token
	 * @returns
	 */
	async getUserFromJwt(token: string): Promise<Result<User | null, AuthError>> {
		const { data, error } = await this.supabase.auth.getUser(token);
		if (error) {
			return err(error);
		}
		return ok(data.user);
	}

	/**
	 * Verifies a JWT token.
	 */
	async verify(token: string): Promise<boolean> {
		return (await this.getUserFromJwt(token)).map(() => true).unwrapOr(false);
	}
}
