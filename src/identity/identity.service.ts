import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckIsNullWithNumber } from '../common/helpers/null-check.helper';

@Injectable()
export class IdentityService {

    constructor(private prisma: PrismaService) { }

    async registerIdentity(data: any, user_id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get user id from token!")

        const identity_data = await this.prisma.identityMember.findUnique({
            where: {
                Full_Name: data.Full_Name
            },
        })

        if (identity_data && identity_data != undefined || identity_data != null) throw new BadRequestException("Name has been already exists!")

        try {

            const isNumberValidate = data != "" && !isNaN(data)

            const validateNumber = isNumberValidate ? Number(data) : 0

            const data_identity = await this.prisma.identityMember.create({
                data: {
                    VillageId: Number(data.VillageId),
                    User_Id: user_id,
                    Full_Name: data.Full_Name,
                    RtId: validateNumber,
                    RwId: validateNumber,
                    Age: validateNumber,
                    Address: data.Address
                }
            })

            if (!data_identity && data_identity == undefined || data_identity == null) throw new BadRequestException("Failed to get payload identity!")

            return data_identity

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async deleteIdentity(id: number) {

        if (!id && id == undefined || id == null) throw new BadRequestException("Failed to get the id from param")

        try {

            const isNumber = id != 0 ? Number(id) : undefined

            const data = await this.prisma.identityMember.delete(
                {
                    where: {
                        id: isNumber,
                    }
                }
            )

            if (!data && data == undefined || data == null) throw new BadRequestException("Failed to get the data that you want to delete it!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async getIdentity(id: number) {

        if (!id && id == undefined || id == null) throw new BadRequestException("Failed to get id from the param!")

        try {

            const isNumber = id != 0 ? Number(id) : undefined

            const find_identity = await this.prisma.identityMember.findUnique({
                where: {
                    id: isNumber
                },
                include: {
                    Village: {
                        select: {
                            Name: true,
                            Address: true
                        }
                    },
                    Rt: {
                        select: {
                            RwId: true,
                            Number: true
                        }
                    },
                    Rw: {
                        select: {
                            Name: true
                        }
                    }
                }
            })

            if (!find_identity && find_identity == undefined || find_identity == null) throw new BadRequestException("Failed to find identity!")

            return find_identity


        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateIdentity(data: any, identity_id: number, user_id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the user id from token!")

        const update_data = CheckIsNullWithNumber(data)

        if (!update_data && update_data == undefined || update_data == null) throw new BadRequestException("Cant find the payload!")

        try {

            const isNumber = identity_id != 0 ? Number(identity_id) : undefined

            const update_identity = await this.prisma.identityMember.update({
                where: {
                    id: isNumber
                },
                data: update_data
            })

            if (!update_identity && update_data == undefined || update_identity == null) throw new BadRequestException("Failed to update!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async getAllIdentity(query: any) {

        const { page, limit, search_query } = query

        const skip = (page - 1) * limit

        if (search_query) {

            const isValidNumber = search_query?.trim() !== "" && !isNaN(Number(search_query))
            const parsedNumber = isValidNumber ? Number(search_query) : null

            const where: any = search_query
                ? {
                    OR: [
                        {
                            Full_Name: {
                                contains: search_query,
                                mode: "insensitive"
                            }
                        },
                        {
                            Address: {
                                contains: search_query,
                                mode: "insensitive"
                            }
                        },
                        ...(isValidNumber ? [
                            { Age: { equals: parsedNumber } },
                            { Rt: { equals: parsedNumber } },
                            { RtId: { equals: parsedNumber } }
                        ] : [])
                    ]
                }
                : {}

            try {

                const [data, total_data] = await Promise.all([
                    this.prisma.identityMember.findMany({
                        skip: skip,
                        take: limit,
                        where: where,
                        select: {
                            Full_Name: true,
                            RtId: true,
                            Rt: true,
                            Age: true,
                            Address: true,
                            Village: true
                        },
                    }),
                    this.prisma.identityMember.count({ where: where })
                ])

                if (!data || total_data == undefined || total_data == null) throw new BadRequestException("Failed to get the total data and data!")

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

        try {

            const [data, total_data] = await Promise.all([
                this.prisma.identityMember.findMany({
                    skip: skip,
                    take: limit,
                    orderBy: {
                        id: "asc"
                    },
                    select: {
                        Full_Name: true,
                        RtId: true,
                        Rt: true,
                        Age: true,
                        Address: true
                    }
                }),
                this.prisma.identityMember.count()
            ])

            if (!data || total_data == undefined || total_data == null) throw new BadRequestException("Failed to get the data and total data!")

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
