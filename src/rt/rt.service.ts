import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseError, ResponseSuccess } from 'src/utils/response_status';
import Undici from 'undici-types';

@Injectable()
export class RtService {

    constructor(private prisma: PrismaService) { }

    async registerRt(data: any, user_id: number) {

        if (user_id == undefined || user_id == null) {
            return ResponseError(
                null,
                HttpStatus.UNAUTHORIZED,
                "Failed to get the user id!",
                false
            )
        }

        if (data == undefined || data == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to initiate the data must be required!",
                false
            )
        }

        try {

            const data_create = await this.prisma.rt.create({
                data: {
                    RwId: data.RwId,
                    Number: data.Number
                }
            })

            if (data_create == undefined || data_create == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to create data because the value is null!",
                    false
                )
            }

            return ResponseSuccess(
                data,
                HttpStatus.CREATED,
                "Successfully to create new rt!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to create new data rt!",
                false
            )
        }

    }

}
