import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
export declare class FilterException implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): Response<any, Record<string, any>>;
}
