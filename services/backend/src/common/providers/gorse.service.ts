import { Injectable } from "@nestjs/common";
import { Gorse } from "gorsejs";

import { ConfigService } from "./config.service";

/**
 * Type for Gorse feedback.
 */
export type FeedbackType = "dislike" | "like" | "reblog";

@Injectable()
export class GorseService extends Gorse<FeedbackType> {
	constructor(config: ConfigService) {
		super({
			endpoint: config.getOrThrow("gorse.endpoint"),
		});
	}
}
