import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/providers/prisma.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class IntegrationService implements OnModuleInit {
	private readonly logger = new Logger(IntegrationService.name);
	private readonly integrationTypes: Prisma.UserProfileIntegrationTypeCreateInput[] = [];

	constructor(
		private readonly users: UserService,
		private readonly prisma: PrismaService
	) {}

	/**
	 * Register a new integration type.
	 * @param id
	 * @param label
	 * @param description
	 */
	registerIntegrationType(id: string, label: string, description: string) {
		this.integrationTypes.push({
			id,
			label,
			description,
		});
		this.logger.debug(`Registered integration type: ${id}`);
	}

	onModuleInit() {
		this.logger.log("Sync integration types with database...");
		this.registerIntegrationType(
			"twitter",
			"Twitter",
			"Connect your Twitter account and automatically share your posts."
		);
		this.registerIntegrationType("discord", "Discord", "Connect your Discord account.");
		this.registerIntegrationType(
			"instagram",
			"Instagram",
			"Connect your Instagram account and automatically share your posts."
		);
		this.registerIntegrationType(
			"twitch",
			"Twitch",
			"Connect your Twitch account and automatically share your streams."
		);
		this.registerIntegrationType(
			"picarto",
			"Picarto",
			"Connect your Picarto account and automatically share your streams."
		);
		this.registerIntegrationType(
			"youtube",
			"YouTube",
			"Connect your YouTube account and automatically share your streams."
		);

		return this.prisma.$transaction(
			this.integrationTypes.map((type) =>
				this.prisma.userProfileIntegrationType.upsert({
					where: { id: type.id },
					create: type,
					update: type,
				})
			)
		);
	}
}
