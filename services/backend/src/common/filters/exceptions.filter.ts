import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
	private readonly logger = new Logger(ExceptionsFilter.name);

	override catch(exception: unknown, host: ArgumentsHost): void {
		super.catch(exception, host);

		// get status and switch
		const status = this.getHttpStatus(exception);
		if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
			if (exception instanceof Error) {
				this.logger.error({ err: exception });
			} else {
				this.logger.error("Unhandled exception", exception);
			}
		}
	}

	private getHttpStatus(exception: unknown): HttpStatus {
		return exception instanceof HttpException
			? exception.getStatus()
			: HttpStatus.INTERNAL_SERVER_ERROR;
	}
}
