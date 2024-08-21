/* eslint-disable @typescript-eslint/no-magic-numbers */
import { z } from "zod";

/**
 * User Profile Tag
 */
export const UserProfileTag = z.object({
	name: z.string(),
	color: z.string().regex(/^#[0-9a-f]{6}$/u),
});

/**
 * User Profile Schema
 */
export const UserProfileSchema = z.object({
	// mandatory
	displayName: z.string().min(3).max(32),
	// profile features
	bio: z.string().max(256).optional(),
	avatarUrl: z.string().url().optional(),
	bannerUrl: z.string().url().optional(),
	websiteUrl: z.string().url().optional(),
	timezone: z.string().optional(),
	country: z.string().optional(),
	// display
	tags: z.array(UserProfileTag),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

/**
 * User Schema
 */
export const UserSchema = z.object({
	username: z.string().min(3).max(32),
	profile: UserProfileSchema,
});

export type User = z.infer<typeof UserSchema>;

/**
 * Create User Schema
 */
export const CreateUserSchema = z.object({
	email: z.string().email(),
	username: z.string().min(3).max(32),
});

export type CreateUser = z.infer<typeof CreateUserSchema>;

export const UserQuerySchema = z.object({
	username: z.string().min(3).max(32).optional(),
	displayName: z.string().min(3).max(32).optional(),
});

export type UserQuery = z.infer<typeof UserQuerySchema>;
