import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfig, Path, PathValue } from "@nestjs/config";

import { Config } from "../../config";

@Injectable()
export class ConfigService<K = Config> extends NestConfig<K> {
	override get<P extends Path<K>>(path: P): PathValue<K, P> | undefined {
		return super.get(path, { infer: true });
	}

	override getOrThrow<P extends Path<K>>(path: P): Exclude<PathValue<K, P>, null | undefined> {
		const value = super.get(path, { infer: true });
		if (value === undefined || value === null) {
			throw new Error(`Config value at path ${path} is undefined`);
		}
		return value as Exclude<PathValue<K, P>, null | undefined>;
	}
}
