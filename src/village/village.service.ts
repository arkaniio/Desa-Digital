import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseError, ResponseSuccess } from 'src/utils/response_status';

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

}
