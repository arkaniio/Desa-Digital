import { HttpStatus } from "@nestjs/common";
export declare const ResponseSuccess: (data: any, status_code: HttpStatus, message: string, success: boolean) => {
    status_code: HttpStatus;
    message: string;
    data: any;
    success: boolean;
};
export declare const ResponseError: (data: any, status_code: HttpStatus, message: string, success: boolean) => never;
