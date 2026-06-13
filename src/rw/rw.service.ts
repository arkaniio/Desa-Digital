import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckIsNullWithNumber } from '../common/helpers/null-check.helper';
import { MAPPING_SELECT_RW } from './constants/rw.mapping_select';

@Injectable()
export class RwService {

    constructor(private prisma: PrismaService) { }

    async updateRw(data: any, user_id: number, id: number) {

        if (user_id == undefined) throw new UnauthorizedException("Failed to get user_id from token!")

        try {

            const findDataUsingId = await this.prisma.rw.findFirst({
                where: {
                    Id: id,
                    Leader_Id: user_id
                }
            })

            if (!findDataUsingId) throw new NotFoundException("Failed to detect the id that you want to delete it!")

            const update_data_Rw = CheckIsNullWithNumber(data)

            if (!update_data_Rw || Object.keys(update_data_Rw).length === 0) throw new BadRequestException("Failed to get the update data payload!")

            const update_data = await this.prisma.rw.update({
                where: {
                    Id: id,
                    Leader_Id: user_id
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

        if (user_id == undefined) throw new UnauthorizedException("Failed to get the user id from token!")

        try {

            const findDataUsingId = await this.prisma.rw.findFirst({
                where: {
                    Id: id,
                    Leader_Id: user_id
                }
            })

            if (!findDataUsingId) throw new NotFoundException("Failed to detect id that you want to delete it!")

            const delete_data = await this.prisma.rw.delete({
                where: {
                    Id: id,
                    Leader_Id: user_id
                }
            })

            if (!delete_data) throw new BadRequestException("Not found!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }
}

