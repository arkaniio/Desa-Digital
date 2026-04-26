import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CheckIsNullWithNumber } from 'src/utils/checking_null_update';
import { ResponseError, ResponseSuccess } from 'src/utils/response_status';

@Injectable()
export class IdentityService {

    constructor(private prisma: PrismaService) { }

    async registerIdentity(data: any, user_id: number) {


        if (user_id == undefined || user_id == null) {
            return ResponseError(
                null,
                HttpStatus.UNAUTHORIZED,
                "Failed to get the user id!",
                false
            )
        }

        const identity_data = await this.prisma.identityMember.findUnique({
            where: {
                Full_Name: data.Full_Name
            },
        })

        if (identity_data != undefined || identity_data != null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Name has been already exists!",
                false
            )
        }

        try {

            const data_identity = await this.prisma.identityMember.create({
                data: {
                    VillageId: Number(data.VillageId),
                    User_Id: user_id,
                    Full_Name: data.Full_Name,
                    RtId: Number(data.RtId),
                    RwId: Number(data.RwId),
                    Age: Number(data.Age),
                    Address: data.Address
                }
            })
            if (data_identity == undefined || data_identity == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to create new identity!",
                    false
                )
            }

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

        if (id == undefined || id == null) {
            return ResponseError(
                null,
                HttpStatus.UNAUTHORIZED,
                "Failed to detect the id identity!",
                false
            )
        }

        try {

            const data = await this.prisma.identityMember.delete(
                {
                    where: {
                        id: Number(id),
                    }
                }
            )

            if (data == undefined || data == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to delete data identity!",
                    false
                )
            }

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

        if (id == undefined || id == null) {
            return ResponseError(
                null,
                HttpStatus.UNAUTHORIZED,
                "Failed to detect the id!",
                false
            )
        }

        try {

            const find_identity = await this.prisma.identityMember.findUnique({
                where: {
                    id: id
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

            if (find_identity == undefined || find_identity == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to get the find identity!",
                    false
                )
            }

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

        if (user_id == undefined || user_id == null) {
            return ResponseError(
                null,
                HttpStatus.UNAUTHORIZED,
                "Failed to detect the user id!",
                false
            )
        }

        const update_data = CheckIsNullWithNumber(data)

        try {

            const update_identity = await this.prisma.identityMember.update({
                where: {
                    id: Number(identity_id)
                },
                data: update_data
            })

            if (update_identity == undefined || update_identity == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to update the identity data!",
                    false
                )
            }

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

                if (!data || total_data == undefined || total_data == null) {
                    return ResponseError(
                        null,
                        HttpStatus.BAD_REQUEST,
                        "Failed to get the data and total data!",
                        false
                    )
                }

                return ResponseSuccess(
                    [{
                        data: data,
                        meta: {
                            total: total_data,
                            page: page,
                            limit: limit,
                            skip: skip,
                            last_page: Math.ceil(total_data / limit)
                        }
                    }],
                    HttpStatus.OK,
                    "Successfully to get all data identity!",
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

            if (!data || total_data == undefined || total_data == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to get the data and total data!",
                    false
                )
            }

            return ResponseSuccess(
                [{
                    data: data,
                    meta: {
                        total: total_data,
                        page: page,
                        limit: limit,
                        skip: skip,
                        last_page: Math.ceil(total_data / limit)
                    }
                }],
                HttpStatus.OK,
                "Successfully to get all data identity!",
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

}
