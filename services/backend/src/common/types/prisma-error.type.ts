import {
	PrismaClientInitializationError,
	PrismaClientKnownRequestError,
	PrismaClientRustPanicError,
	PrismaClientUnknownRequestError,
	PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export type PrismaError =
	| PrismaClientInitializationError
	| PrismaClientKnownRequestError
	| PrismaClientRustPanicError
	| PrismaClientUnknownRequestError
	| PrismaClientValidationError;
