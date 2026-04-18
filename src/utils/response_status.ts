import { BadRequestException, HttpStatus } from "@nestjs/common"

export const ResponseSuccess = (data: any, status_code: HttpStatus, message: string, success: boolean) => {

    return {
        status_code: status_code,
        message: message,
        data: data,
        success: success
    }

}

export const ResponseError = (data: any, status_code: HttpStatus, message: string, success: boolean) => {

    throw new BadRequestException({
        status_code: status_code,
        message: message,
        data: data,
        success: success
    })

}