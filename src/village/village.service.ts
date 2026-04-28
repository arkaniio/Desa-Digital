import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckIsNull } from '../common/helpers/null-check.helper';

@Injectable()
export class VillageService {

    constructor(private prisma: PrismaService) { }

    async createNewVillage(data: any, user_id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        const find_unique_name = await this.prisma.village.findFirst({
            where: {
                Name: data.Name
            }
        })

        if (find_unique_name != undefined || find_unique_name != null) throw new BadRequestException("Name has been already exists!")

        try {

            const isNumberValidate = data != "" && !isNaN(data)

            const validateNumber = isNumberValidate ? Number(data) : 0

            const data_create = await this.prisma.village.create({
                data: {
                    Name: data.Name,
                    Address: data.Address,
                    Total_Population: validateNumber,
                    Village_Age: validateNumber,
                    Leader_VillageId: validateNumber
                }
            })

            if (!data_create && data_create == undefined || data_create == null) throw new BadRequestException("Failed to create because the data is nill!")

            return data_create

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async deleteVillage(id: number, user_id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        try {

            const isNumber = id != 0 ? Number(id) : undefined

            const delete_data = await this.prisma.village.delete({
                where: {
                    id: isNumber
                }
            })

            if (!delete_data && delete_data == undefined || delete_data == null) throw new BadRequestException("Not Found!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateVillage(data: any, user_id: number, id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the user id data from token!")

        //tools
        const update_data = CheckIsNull(data)
        //

        if (!update_data && update_data == undefined || update_data == null) throw new BadRequestException("Failed to get the payload of the update data!")

        try {

            const isNumber = id != 0 ? Number(id) : undefined

            const update = await this.prisma.village.update({
                where: {
                    id: isNumber
                },
                data: update_data
            })

            if (!update && update == undefined || update == null) throw new BadRequestException("Failed to update data!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async getAllVillage(user_id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the user id data from token!")

        try {

            const getAll_village = await this.prisma.village.findMany()

            if (getAll_village == undefined || getAll_village == null) throw new BadRequestException("Failed to get village!")

            return getAll_village

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

}
