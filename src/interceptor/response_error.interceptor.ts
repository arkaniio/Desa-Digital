import { ArgumentsHost, Catch, ExceptionFilter, ExecutionContext, HttpException } from "@nestjs/common";
import { Response } from "express";
import { Request } from "express";

@Catch()
export class FilterException implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp()

        const request_ctx = ctx.getRequest<Request>()

        const response_ctx = ctx.getResponse<Response>()

        const response_exception = exception.getResponse()

        const status_exception = exception.getStatus()

        return response_ctx.status(status_exception).json({
            message: "not success!",
            data: response_exception,
            statusCode: response_ctx.statusCode,
            meta: {
                path_url: request_ctx.url,
                timestamp: new Date().toISOString()
            }
        })

    }

}