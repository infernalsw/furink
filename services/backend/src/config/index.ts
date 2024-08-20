import { merge } from "lodash";

import type { Config } from "./config.interface";
import { defaults } from "./environments/defaults";
import { development } from "./environments/development";
import { production } from "./environments/production";

export * from "./config.interface";

export const loadConfiguration = async (): Promise<Config> => {
	return merge(defaults, process.env.NODE_ENV === "production" ? production : development);
};
