import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @InjectPinoLogger(AllExceptionsFilter.name)
    private readonly logger: PinoLogger
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const args = host.getArgs();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    this.logger.error("exception", exception);
    // console.log("request", request.url, request.params, request.body);
    // console.log("response", response);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : "Internal server error";

    const exceptionResponse = exception.response ? exception.response : [];
    response.status(status).json({
      statusCode: status,
      message,
      response: exceptionResponse,
      path: request.url,
    });
  }
}
