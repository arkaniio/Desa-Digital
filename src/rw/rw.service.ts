import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
                    VillageId: Number(data.VillageId),
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

        if (id == null) throw new NotFoundException("Failed to get the param id!")

        const update_data_Rw = CheckIsNullWithNumber(data)

        if (!update_data_Rw || Object.keys(update_data_Rw).length === 0) throw new BadRequestException("Failed to get the update data payload!")

        try {

            const update_data = await this.prisma.rw.update({
                where: {
                    Id: Number(id),
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

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        if (id == null) throw new NotFoundException("Failed to get the id from the param!")

        try {

            const delete_data = await this.prisma.rw.delete({
                where: {
                    Id: Number(id),
                    Leader_Id: user_id
                }
            })

            if (!delete_data) throw new BadRequestException("Not found!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async getAllRw(user_id: number, query: any, village_id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from token or auth params!")

        const findDataVillage = await this.prisma.rw.findFirst({
            where: {
                VillageId: village_id
            }
        })

        if (!findDataVillage || findDataVillage == undefined && findDataVillage == null) throw new NotFoundException("Failed to detect the village id!")


        const { page, limit } = query

        const skip = (page - 1) * limit

        // Jangan Lupa difilter oleh sender id agar tidak bisa get submissions semua orang
        try {

            const [data, total_data] = await Promise.all([
                this.prisma.rw.findMany({
                    skip: skip,
                    take: limit,
                    where: {
                        Leader_Id: user_id,
                        VillageId: village_id
                    },
                    orderBy: {
                        Id: "asc"
                    },
                    select: {
                        Name: true,
                        Village: {
                            select: {
                                Name: true,
                                Address: true,
                                Leader_Village: {
                                    select: {
                                        Username: true,
                                        Address: true,
                                        Avatar: true
                                    }
                                }
                            }
                        },
                        Leader: {
                            select: {
                                Username: true,
                                Address: true,
                                Avatar: true
                            }
                        }
                    }
                }),
                this.prisma.rw.count({
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

