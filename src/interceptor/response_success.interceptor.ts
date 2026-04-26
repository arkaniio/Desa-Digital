import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { Response } from "express";
import { Request } from "express";

@Injectable()
export class TransformInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const ctx = context.switchToHttp()

        const request = ctx.getRequest<Request>()

        const response = ctx.getResponse<Response>()

        return next.handle().pipe(
            map((data) => {
                message: "success"
                data: data
                statusCode: response.statusCode
                meta: {
                    path_url: request.url
                    timestamp: new Date().toISOString()
                }
            })
        )

    }

}