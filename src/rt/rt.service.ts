import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CheckIsNullWithNumber } from '../common/helpers/null-check.helper.js';
import { ResponseError, ResponseSuccess } from '../common/helpers/response.helper.js';

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

    async updateRt(data: any, user_id: number, id: number) {

        if (!user_id && id == undefined || !user_id && id == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to detect the user id or id!",
                false
            )
        }

        const update_data = CheckIsNullWithNumber(data)

        try {

            const update = await this.prisma.rt.update({
                where: {
                    Id: Number(id)
                },
                data: update_data
            })

            if (!update || update == undefined) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to update the data because the value is undefined!",
                    false
                )
            }

            return ResponseSuccess(
                true,
                HttpStatus.OK,
                "Successfully to update the data of rt!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to update the data Rt!",
                false
            )
        }


    }

    async deleteRt(user_id: number, id: number) {

        if (!user_id && id == undefined || !user_id && id == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the user_id and id from the request!",
                false
            )
        }

        try {

            const delete_data = await this.prisma.rt.delete({
                where: {
                    Id: Number(id)
                }
            })

            if (!delete_data && delete_data == undefined || delete_data == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to delete data because the data that you want to delete it is nill or undefined!",
                    false
                )
            }

            return ResponseSuccess(
                true,
                HttpStatus.OK,
                "Successfully to delete the data rw!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to delete the rt data!",
                false
            )
        }

    }

}
