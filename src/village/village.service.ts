import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CheckIsNull } from '../common/helpers/null-check.helper.js';
import { ResponseError, ResponseSuccess } from '../common/helpers/response.helper.js';

@Injectable()
export class VillageService {

    constructor(private prisma: PrismaService) { }

    async createNewVillage(data: any, user_id: number) {

        if (user_id == undefined || user_id == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the user id from token!",
                false
            )
        }

        const find_unique_name = await this.prisma.village.findFirst({
            where: {
                Name: data.Name
            }
        })

        if (find_unique_name != undefined || find_unique_name != null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the same name when create new village!",
                false
            )
        }

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

            if (!data_create == undefined || data_create == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to create the data because the data is null or undefined!",
                    false
                )
            }

            return ResponseSuccess(
                data_create,
                HttpStatus.CREATED,
                "Successfully to create new village data!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to create new vilage as a leader of village!",
                false
            )
        }

    }

    async deleteVillage(id: number, user_id: number) {

        if (!id == undefined && user_id == undefined || id == null && user_id == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to delete the village using id and user_id!",
                false
            )
        }

        try {

            const delete_data = await this.prisma.village.delete({
                where: {
                    id: Number(id)
                }
            })

            if (!delete_data == undefined || delete_data == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to delete data because the data that you want to delete is null!",
                    false
                )
            }

            return ResponseSuccess(
                true,
                HttpStatus.OK,
                "Successfully to delete the data!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to delete the data village!",
                false
            )
        }

    }

    async updateVillage(data: any, user_id: number, id: number) {

        if (!id == undefined && user_id == undefined || id == null && user_id == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to update the village using id and user_id!",
                false
            )
        }

        //tools
        const update_data = CheckIsNull(data)
        //

        try {

            const update = await this.prisma.village.update({
                where: {
                    id: Number(id)
                },
                data: update_data
            })

            if (!update == undefined || update == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to update because the result is nill!",
                    false
                )
            }

            return ResponseSuccess(
                null,
                HttpStatus.OK,
                "Success to update the village data!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to update the data!",
                false
            )
        }

    }

    async getAllVillage(user_id: number) {

        if (!user_id == undefined || user_id == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the user id from token jwt!",
                false
            )
        }

        try {

            const getAll_village = await this.prisma.village.findMany({
                include: {
                    identityVilages: {
                        select: {
                            Full_Name: true,
                            Age: true,
                            Address: true,
                            Village: true,
                            Rt: true,
                            Rw: true
                        }
                    }
                }
            })

            if (getAll_village == undefined || getAll_village == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Not Found!",
                    false
                )
            }

            return ResponseSuccess(
                getAll_village,
                HttpStatus.OK,
                "Successfully to get all data of village!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to get all data of village!",
                false
            )
        }

    }

}
