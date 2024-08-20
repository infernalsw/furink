import { Agenda } from "@hokify/agenda";
import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";

import { ConfigService } from "./config.service";

@Injectable()
export class AgendaService extends Agenda implements OnApplicationBootstrap {
	private readonly logger = new Logger(AgendaService.name);

	constructor(config: ConfigService) {
		super({
			db: {
				address: config.getOrThrow("agenda.endpoint"),
			},
		});
	}

	onApplicationBootstrap() {
		this.logger.log("Starting Agenda job scheduling");
		return this.start();
	}
}
