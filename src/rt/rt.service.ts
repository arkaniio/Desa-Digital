import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CheckIsNullWithNumber } from '../common/helpers/null-check.helper.js';
import { ResponseError, ResponseSuccess } from '../common/helpers/response.helper.js';

@Injectable()
export class RtService {

    constructor(private prisma: PrismaService) { }

    async registerRt(data: any, user_id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get user_id from token!")

        try {

            const data_create = await this.prisma.rt.create({
                data: {
                    RwId: data.RwId,
                    Number: data.Number
                }
            })

            if (!data_create && data_create == undefined || data_create == null) throw new BadRequestException("Failed to create and detect the data!")

            return data_create

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateRt(data: any, user_id: number, id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get data from token!")

        if (!id && id == undefined || id == null) throw new BadRequestException("Failed to get the id from the param!")

        const update_data = CheckIsNullWithNumber(data)

        if (!update_data && update_data == undefined || update_data == null) throw new BadRequestException("Failed to get the payload for update!")

        try {

            const isNumber = id != 0 ? Number(id) : undefined

            const update = await this.prisma.rt.update({
                where: {
                    Id: isNumber
                },
                data: update_data
            })

            if (!update && update == undefined || update == null) throw new BadRequestException("Failed to update data!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }


    }

    async deleteRt(user_id: number, id: number) {

        if (!user_id && user_id == undefined || !user_id == null) throw new UnauthorizedException("Failed to get the data user from token and id from param!")

        if (!id && id == undefined || id == null) throw new BadRequestException("Failed to get the id from the param!")

        try {

            const isNumber = id != 0 ? Number(id) : undefined

            const delete_data = await this.prisma.rt.delete({
                where: {
                    Id: isNumber
                }
            })

            if (!delete_data && delete_data == undefined || delete_data == null) throw new BadRequestException("Not found!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

}
