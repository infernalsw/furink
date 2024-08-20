import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "src/common/providers/prisma.service";
import { TypesenseService } from "src/common/providers/typesense.service";

@Injectable()
export class UserService implements OnModuleInit {
	constructor(
		private readonly prisma: PrismaService,
		private readonly typesense: TypesenseService
	) {}

	onModuleInit() {
		this.typesense.registerCollection({
			name: "users",
			fields: [
				{
					name: "username",
					type: "string",
				},
			],
		});
	}
}
