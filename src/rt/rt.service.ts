import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckIsNullWithNumber } from '../common/helpers/null-check.helper';
import { MAPPING_SELECT_RT } from './constants/rt.mapping_select';

@Injectable()
export class RtService {

    constructor(private prisma: PrismaService) { }

    async updateRt(data: any, user_id: number, id: number) {

        if (user_id == undefined) throw new UnauthorizedException("Failed to get data from token!")

        try {

            const findDataUsingId = await this.prisma.rt.findFirst({
                where: {
                    Id: id,
                    Leader_Id: user_id
                }
            })

            if (!findDataUsingId) throw new NotFoundException("Failed to detect id of the data that you want to update it!")

            const update_data = CheckIsNullWithNumber(data)

            if (!update_data || Object.keys(update_data).length === 0) throw new BadRequestException("Failed to get the payload for update!")

            const update = await this.prisma.rt.update({
                where: {
                    Id: id,
                    Leader_Id: user_id
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

        if (user_id == undefined) throw new UnauthorizedException("Failed to get the data user from token!")

        try {

            const findDataUsingId = await this.prisma.rt.findFirst({
                where: {
                    Id: id,
                    Leader_Id: user_id
                }
            })

            if (!findDataUsingId) throw new NotFoundException("Failed to detect the id that you want to delete it!")

            const delete_data = await this.prisma.rt.delete({
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

