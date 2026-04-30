import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { Request } from "express";

@Catch()
export class FilterException implements ExceptionFilter {

    catch(exception: unknown, host: ArgumentsHost) {

        const ctx = host.switchToHttp()

        const request_ctx = ctx.getRequest<Request>()

        const response_ctx = ctx.getResponse<Response>()

        const status_exception = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR

        const response_exception = exception instanceof HttpException
            ? exception.getResponse()
            : { message: exception instanceof Error ? exception.message : 'Internal Server Error' }

        return response_ctx.status(status_exception).json({
            message: "not success!",
            data: response_exception,
            statusCode: status_exception,
            meta: {
                path_url: request_ctx.url,
                timestamp: new Date().toISOString()
            }
        })

    }

}