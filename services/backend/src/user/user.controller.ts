import { UserQuery } from "@furinkapp/models";
import { Body, Controller, Get, NotFoundException, Param } from "@nestjs/common";

import { UserService } from "./user.service";

@Controller("users")
export class UserController {
	constructor(private readonly users: UserService) {}

	@Get("/:id")
	async getUser(@Param("id") id: string) {
		const user = await this.users.findOne({ id });
		if (!user) {
			throw new NotFoundException();
		}
		return user;
	}

	@Get("/search")
	async searchUsers(@Body() query: UserQuery) {
		return this.users.search(query);
	}
}
