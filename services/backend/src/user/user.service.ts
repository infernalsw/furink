import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/providers/prisma.service";

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}
}
