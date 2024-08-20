import { Injectable } from "@nestjs/common";
import { Client as TypesenseClient } from "typesense";

@Injectable()
export class TypesenseService extends TypesenseClient {
	constructor() {
		// super({});
	}
}
