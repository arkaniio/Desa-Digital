import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CheckIsNull, CheckIsNullWithNumber } from '../common/helpers/null-check.helper.js';

@Injectable()
export class VillageService {

    constructor(private prisma: PrismaService) { }

    async createNewVillage(data: any, user_id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        const find_unique_name = await this.prisma.village.findFirst({
            where: {
                Name: data.Name
            }
        })

        if (find_unique_name) throw new BadRequestException("Name has been already exists!")

        try {

            const data_create = await this.prisma.village.create({
                data: {
                    Name: data.Name,
                    Address: data.Address,
                    Total_Population: Number(data.Total_Population),
                    Village_Age: Number(data.Village_Age),
                    Leader_VillageId: Number(data.Leader_VillageId)
                }
            })

            if (!data_create) throw new BadRequestException("Failed to create because the data is nill!")

            return data_create

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async deleteVillage(id: number, user_id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        try {

            const delete_data = await this.prisma.village.delete({
                where: {
                    id: Number(id)
                }
            })

            if (!delete_data) throw new BadRequestException("Not Found!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateVillage(data: any, user_id: number, id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id data from token!")

        //tools
        const update_data = CheckIsNullWithNumber(data)
        //

        if (!update_data || Object.keys(update_data).length === 0) throw new BadRequestException("Failed to get the payload of the update data!")

        try {

            const update = await this.prisma.village.update({
                where: {
                    id: Number(id)
                },
                data: update_data
            })

            if (!update) throw new BadRequestException("Failed to update data!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async getAllVillage(user_id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id data from token!")

        try {

            const getAll_village = await this.prisma.village.findMany()

            if (!getAll_village) throw new BadRequestException("Failed to get village!")

            return getAll_village

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

}

