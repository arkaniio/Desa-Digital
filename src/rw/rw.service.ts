import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CheckIsNullWithNumber } from 'src/utils/checking_null_update';
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
                HttpStatus.CREATED,
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

    async updateRw(data: any, user_id: number, id: number) {

        if (user_id == undefined || user_id == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the user id!",
                false
            )
        }

        if (!id && id == undefined || id == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the id rw of the params!",
                false
            )
        }

        const update_data_Rw = CheckIsNullWithNumber(data)

        try {

            const update_data = await this.prisma.rw.update({
                where: {
                    Id: Number(id)
                },
                data: update_data_Rw
            })

            if (!update_data || update_data == undefined) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to update the rw data!",
                    false
                )
            }

            return ResponseSuccess(
                true,
                HttpStatus.OK,
                "Successfully to update data rw!",
                true
            )

        } catch (error) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to update the data of rw!",
                false
            )
        }

    }

    async deleteRw(user_id: number, id: number) {

        if (!user_id && id || user_id && id == undefined || user_id && id == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to detect the user id and id!",
                false
            )
        }

        try {

            const delete_data = await this.prisma.rw.delete({
                where: {
                    Id: Number(id)
                }
            })

            if (!delete_data && delete_data == undefined || delete_data == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to delete the data because the params and token is null!",
                    false
                )
            }

            return ResponseSuccess(
                true,
                HttpStatus.OK,
                "Successfully to delete the some data!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to delete the data of rw!",
                false
            )
        }

    }

}
