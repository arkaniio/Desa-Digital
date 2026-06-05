import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CheckIsNull, CheckIsNullWithNumber } from '../common/helpers/null-check.helper.js';

@Injectable()
export class VillageService {

    constructor(private prisma: PrismaService) { }

    async createNewVillage(data: any, user_id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        const find_unique_name = await this.prisma.village.findUnique({
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
                    Total_Population: data.Total_Population,
                    Village_Age: data.Village_Age,
                    Leader_VillageId: data.Leader_VillageId
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

        if (id == null && id == undefined) throw new NotFoundException("Failed to detect the id from the parameter!")

        try {

            const findDataUsingId = await this.prisma.village.findFirst({
                where: {
                    id: id
                }
            })

            if (!findDataUsingId || findDataUsingId == null && findDataUsingId == undefined) throw new NotFoundException("Failed to detect the id that you want to delete it!")

            const delete_data = await this.prisma.village.delete({
                where: {
                    id: id
                }
            })

            if (!delete_data) throw new BadRequestException("Can't find the data that you want to delete it!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateVillage(data: any, user_id: number, id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the user id data from token!")

        if (id == null && id == undefined) throw new NotFoundException("Failed to detect the id in the parameter request!")

        try {

            const findDataUsingId = await this.prisma.village.findFirst({
                where: {
                    id: id
                }
            })

            if (!findDataUsingId || findDataUsingId == null && findDataUsingId == undefined) throw new NotFoundException("Failed to detect the data that you want to update!")

            //tools
            const update_data = CheckIsNullWithNumber(data)
            //

            if (!update_data || Object.keys(update_data).length === 0) throw new BadRequestException("Failed to get the payload of the update data!")


            const update = await this.prisma.village.update({
                where: {
                    id: id
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

            const getAll_village = await this.prisma.village.findMany({
                select: {
                    Name: true,
                    Address: true,
                    Village_Age: true,
                    Leader_Village: {
                        select: {
                            Username: true,
                            Address: true,
                            Avatar: true
                        }
                    }
                }
            })

            if (!getAll_village || getAll_village == null && getAll_village == undefined) throw new BadRequestException("Failed to get village!")

            return getAll_village

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

}

