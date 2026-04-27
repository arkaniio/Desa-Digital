import { BadGatewayException, BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CheckIsNullWithNumber } from '../common/helpers/null-check.helper.js';
import { ResponseError, ResponseSuccess } from '../common/helpers/response.helper.js';

@Injectable()
export class RwService {

    constructor(private prisma: PrismaService) { }

    async registerRw(data: any, user_id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the user id data from token!")

        try {

            const data_create = await this.prisma.rw.create({
                data: {
                    Name: data.Name
                }
            })

            if (!data_create && data_create == undefined || data_create == null) throw new BadRequestException("Failed to create data because data is nill!")

            return data_create

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateRw(data: any, user_id: number, id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get user_id from token!")

        if (!id && id == undefined || id == null) throw new BadRequestException("Failed to get the param id!")

        const update_data_Rw = CheckIsNullWithNumber(data)

        if (!update_data_Rw && update_data_Rw == undefined || update_data_Rw == null) throw new BadRequestException("Failed to get the update data payload!")

        try {

            const isNumber = id != 0 ? Number(id) : undefined

            const update_data = await this.prisma.rw.update({
                where: {
                    Id: isNumber
                },
                data: update_data_Rw
            })

            if (!update_data && update_data == undefined || update_data == undefined) throw new BadRequestException("Failed to get the data of update!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async deleteRw(user_id: number, id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        if (!id && id == undefined || id == null) throw new BadRequestException("Failed to get the id from the param!")

        try {

            const isNumber = id != 0 ? Number(id) : undefined

            const delete_data = await this.prisma.rw.delete({
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
