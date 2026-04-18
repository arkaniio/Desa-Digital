import { BadRequestException, HttpStatus, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { throwDeprecation } from 'node:process';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ResponseError, ResponseSuccess } from 'src/utils/response_status';

@Injectable()
export class IdentityService {

    constructor(private prisma: PrismaService) { }

    async registerIdentity(data: any, user_id: number) {


        if (!user_id) return ResponseError(
            null,
            HttpStatus.BAD_REQUEST,
            "Failed to get the user id!",
            false
        )

        const identity_data = await this.prisma.identity.findUnique({
            where: {
                Full_Name: data.Full_Name
            },
        })

        if (identity_data) return ResponseError(
            null,
            HttpStatus.BAD_REQUEST,
            "Name has been already exists!",
            false
        )

        try {

            const data_identity = await this.prisma.identity.create(
                {
                    data: {
                        User_Id: user_id,
                        Full_Name: data.Full_Name,
                        Age: data.Age,
                        Rt: data.Rt,
                        Adress: data.Adress,
                    }
                }
            )
            if (!data_identity) return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to create new identity!",
                false
            )

            return ResponseSuccess(
                data_identity,
                HttpStatus.OK,
                "Successfully to create the new identity!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to create new data identity!",
                false
            )
        }

    }

    async deleteIdentity(id: number) {

        if (id == null) return ResponseError(
            null,
            HttpStatus.BAD_REQUEST,
            "Failed to detect the id identity!",
            false
        )

        try {

            const data = await this.prisma.identity.findUnique(
                {
                    where: {
                        id: id
                    }
                }
            )

            if (!data) return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the data identity!",
                false
            )

            return ResponseSuccess(
                data,
                HttpStatus.OK,
                "Successfully to get the data!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to get the data identity!",
                false
            )

        }

    }

    async getIdentity(id: number) {

        if (!id) return ResponseError(
            null,
            HttpStatus.BAD_REQUEST,
            "Failed to detect the id!",
            false
        )

        try {

            const find_identity = await this.prisma.identity.findUnique({
                where: {
                    id: id
                },
                include: {
                    User: true
                }
            })

            if (!find_identity) return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the find identity!",
                false
            )

            return ResponseSuccess(
                find_identity,
                HttpStatus.OK,
                "Successfully to get the identity!",
                true
            )


        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to get the identity!",
                false
            )
        }

    }

    async updateIdentity(data: any, user_id: number) {

        if (!user_id) return ResponseError(
            null,
            HttpStatus.BAD_REQUEST,
            "Failed to detect the user id!",
            false
        )

        const update_data: any = {}
        if (data.Full_Name) update_data.Full_Name = data.Full_Name
        if (data.Age) update_data.Age = data.Age
        if (data.Adress) update_data.Adress = data.Adress

        try {

            const update_identity = await this.prisma.identity.update({
                where: {
                    id: user_id
                },
                data: update_data
            })
            if (!update_identity) return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to update the identity data!",
                false
            )

            return ResponseSuccess(
                update_identity,
                HttpStatus.OK,
                "Successfully to update the identity data!",
                false
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to update data!",
                false
            )
        }

    }

}
