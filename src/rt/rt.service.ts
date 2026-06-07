import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckIsNullWithNumber } from '../common/helpers/null-check.helper';
import { MAPPING_SELECT_RT } from './constants/rt.mapping_select';

@Injectable()
export class RtService {

    constructor(private prisma: PrismaService) { }

    async registerRt(data: any, user_id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get user_id from token!")

        try {

            const data_create = await this.prisma.rt.create({
                data: {
                    Number: data.Number,
                    RwId: data.RwId,
                    VillageId: data.VillageId
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

        if (id == null) throw new NotFoundException("Failed to get the id from the param!")

        try {

            const findDataUsingId = await this.prisma.rt.findFirst({
                where: {
                    Id: id
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

        if (user_id == null) throw new UnauthorizedException("Failed to get the data user from token!")

        if (id == null) throw new NotFoundException("Failed to get the id from the param!")

        try {

            const findDataUsingId = await this.prisma.rt.findFirst({
                where: {
                    Id: id
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

    async getAllRt(user_id: number, query: any, village_id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from token or auth params!")

        const findDataVillage = await this.prisma.rt.findFirst({
            where: {
                VillageId: village_id
            }
        })

        if (!findDataVillage) throw new NotFoundException("Failed to detect the village id!")

        const { page, limit } = query

        const skip = (page - 1) * limit

        // Jangan Lupa difilter oleh sender id agar tidak bisa get submissions semua orang
        try {

            const [data, total_data] = await Promise.all([
                this.prisma.rt.findMany({
                    skip: skip,
                    take: limit,
                    where: {
                        Leader_Id: user_id,
                        VillageId: village_id
                    },
                    orderBy: {
                        Id: "asc"
                    },
                    select: MAPPING_SELECT_RT
                }),
                this.prisma.rt.count({
                    where: {
                        VillageId: user_id
                    }
                })
            ])

            if (!data) throw new BadRequestException("Failed to get the data and total data!")

            return {
                data: data,
                meta: {
                    total: total_data,
                    page: page,
                    limit: limit,
                    skip: skip,
                    last_page: Math.ceil(total_data / limit)
                }
            }


        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

}

