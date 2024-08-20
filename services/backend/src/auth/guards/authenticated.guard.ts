import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { SupabaseService } from "../../common/providers/supabase.service";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly supabase: SupabaseService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		// check if the route is public
		const isPublic = this.reflector.get<boolean>("isPublic", context.getHandler());
		if (isPublic) {
			return true;
		}
		const request = this.getRequest(context);

		// extract auth header
		const authorization: string[] | string =
			request.headers.authorization ?? request.headers.Authorization ?? "";
		if (authorization === "" || (Array.isArray(authorization) && authorization.length === 0)) {
			return false;
		}

		// extract token
		const token = authorization instanceof Array ? authorization[0] : authorization;
		if (token === "") {
			return false;
		}
		// verify
		return this.supabase.verify(token);
	}

	getRequest(context: ExecutionContext): Request {
		return context.switchToHttp().getRequest<Request>();
	}
}
