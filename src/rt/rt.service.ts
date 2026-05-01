import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckIsNullWithNumber } from '../common/helpers/null-check.helper';

@Injectable()
export class RtService {

    constructor(private prisma: PrismaService) { }

    async registerRt(data: any, user_id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get user_id from token!")

        try {

            const data_create = await this.prisma.rt.create({
                data: {
                    RwId: data.RwId,
                    UserId: Number(user_id),
                    Number: data.Number
                }
            })

            if (!data_create) throw new BadRequestException("Failed to create and detect the data!")

            return data_create

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateRt(data: any, user_id: number, id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get data from token!")

        if (id == null) throw new BadRequestException("Failed to get the id from the param!")

        const update_data = CheckIsNullWithNumber(data)

        if (!update_data || Object.keys(update_data).length === 0) throw new BadRequestException("Failed to get the payload for update!")

        try {

            const update = await this.prisma.rt.update({
                where: {
                    Id: Number(id)
                },
                data: update_data
            })

            if (!update) throw new BadRequestException("Failed to update data!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async deleteRt(user_id: number, id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the data user from token!")

        if (id == null) throw new BadRequestException("Failed to get the id from the param!")

        try {

            const delete_data = await this.prisma.rt.delete({
                where: {
                    Id: Number(id)
                }
            })

            if (!delete_data) throw new BadRequestException("Not found!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

}

