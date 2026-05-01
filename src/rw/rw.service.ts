import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckIsNullWithNumber } from '../common/helpers/null-check.helper';

@Injectable()
export class RwService {

    constructor(private prisma: PrismaService) { }

    async registerRw(data: any, user_id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id data from token!")

        try {

            const data_create = await this.prisma.rw.create({
                data: {
                    UserId: Number(user_id),
                    Name: data.Name
                }
            })

            if (!data_create) throw new BadRequestException("Failed to create data because data is nill!")

            return data_create

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateRw(data: any, user_id: number, id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get user_id from token!")

        if (id == null) throw new BadRequestException("Failed to get the param id!")

        const update_data_Rw = CheckIsNullWithNumber(data)

        if (!update_data_Rw || Object.keys(update_data_Rw).length === 0) throw new BadRequestException("Failed to get the update data payload!")

        try {

            const update_data = await this.prisma.rw.update({
                where: {
                    Id: Number(id)
                },
                data: update_data_Rw
            })

            if (!update_data) throw new BadRequestException("Failed to get the data of update!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async deleteRw(user_id: number, id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        if (id == null) throw new BadRequestException("Failed to get the id from the param!")

        try {

            const delete_data = await this.prisma.rw.delete({
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

