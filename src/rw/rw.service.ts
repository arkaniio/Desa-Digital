import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseError, ResponseSuccess } from 'src/utils/response_status';
import Undici from 'undici-types';

@Injectable()
export class RwService {

    constructor(private prisma: PrismaService) { }

    async registerRw(data: any, user_id: number) {

        if (user_id == undefined || user_id == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to detect the user id!",
                false
            )
        }

        if (data == undefined || data == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to detect the data from rw data!",
                false
            )
        }

        try {

            const data_create = await this.prisma.rw.create({
                data: {
                    Name: data.Name
                }
            })

            if (data_create == undefined || data_create == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to create new data!",
                    false
                )
            }

            return ResponseSuccess(
                data_create,
                HttpStatus.OK,
                "Successfully to register data!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to create new data of rw!",
                false
            )
        }

    }

}
