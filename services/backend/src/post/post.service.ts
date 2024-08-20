import { Injectable } from "@nestjs/common";

import { PrismaService } from "../common/providers/prisma.service";

@Injectable()
export class PostService {
	constructor(private readonly prisma: PrismaService) {}
}
