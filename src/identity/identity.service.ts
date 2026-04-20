import { BadRequestException, HttpStatus, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { throwDeprecation } from 'node:process';
import { useReducer } from 'react';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ResponseError, ResponseSuccess } from 'src/utils/response_status';

@Injectable()
export class IdentityService {

    constructor(private prisma: PrismaService) { }

    async registerIdentity(data: any, user_id: number) {


        if (user_id == undefined || user_id == null)
            return ResponseError(
                null,
                HttpStatus.UNAUTHORIZED,
                "Failed to get the user id!",
                false
            )

        const identity_data = await this.prisma.identity.findUnique({
            where: {
                Full_Name: data.Full_Name
            },
        })

        if (identity_data != undefined || identity_data != null)
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Name has been already exists!",
                false
            )

        try {

            const data_identity = await this.prisma.identity.create({
                data: {
                    User_Id: user_id,
                    Full_Name: data.Full_Name,
                    Rt: data.Rt,
                    Age: data.Age,
                    Address: data.Address
                }
            })
            if (data_identity == undefined || data_identity == null)
                return ResponseError(
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

        if (id == undefined || id == null)
            return ResponseError(
                null,
                HttpStatus.UNAUTHORIZED,
                "Failed to detect the id identity!",
                false
            )

        try {

            const data = await this.prisma.identity.delete(
                {
                    where: {
                        id: id
                    }
                }
            )

            if (!data) return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to delete data identity!",
                false
            )

            return ResponseSuccess(
                data,
                HttpStatus.OK,
                "Successfully to delete the data!",
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

        if (id == undefined || id == null)
            return ResponseError(
                null,
                HttpStatus.UNAUTHORIZED,
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

            if (find_identity == undefined || find_identity == null)
                return ResponseError(
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

    async updateIdentity(data: any, identity_id: number, user_id: number) {

        if (user_id == undefined || user_id == null)
            return ResponseError(
                null,
                HttpStatus.UNAUTHORIZED,
                "Failed to detect the user id!",
                false
            )

        const update_data: any = {}
        if (data.Full_Name != undefined || data.Full_Name != null)
            update_data.Full_Name = data.Full_Name

        if (data.Rt != undefined || data.Rt != null) {

            const parsingIntoInt = parseInt(data.Rt)

            if (typeof parsingIntoInt != "number")
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Invalid type of Rt!",
                    false
                )

            update_data.Rt = parsingIntoInt

        }

        if (data.Age != undefined || data.Age != null) {

            const parsingIntoInt = parseInt(data.Age)

            if (typeof parsingIntoInt != "number")
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Invalid type of age!",
                    false
                )

            update_data.Age = parsingIntoInt

        }

        if (data.Address != undefined || data.Address != null)
            update_data.Adress = data.Address

        try {

            const update_identity = await this.prisma.identity.update({
                where: {
                    id: identity_id
                },
                data: update_data
            })

            if (update_identity == undefined || update_identity == null)
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to update the identity data!",
                    false
                )

            return ResponseSuccess(
                true,
                HttpStatus.OK,
                "Successfully to update the identity data!",
                true
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

    async getAllIdentity(query: any) {

        const { page, limit } = query

        const skip = (page - 1) * limit

        const [data, total] = await Promise.all([
            this.prisma.identity.findMany({
                skip: skip,
                take: limit,
                orderBy: {
                    id: "asc"
                },
                include: {
                    User: true
                }
            }),
            this.prisma.identity.count()
        ])

        if (data && total == undefined || data && total == null)
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the full identity!",
                false
            )

        return ResponseSuccess(
            [{
                data: data,
                meta: {
                    total: total,
                    page: page,
                    limit: limit,
                    skip: skip,
                    last_page: Math.ceil(page / limit)
                }
            }],
            HttpStatus.OK,
            "Successfully to get all data identity!",
            true
        )

    }

}
