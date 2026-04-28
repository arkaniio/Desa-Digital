import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BufferUpload } from 'src/common/helpers/cloudinary_helper';
import { CheckIsNullAnnouncement } from 'src/common/helpers/null-check.helper';

@Injectable()
export class AnnouncementService {

    constructor(private prisma: PrismaService) { }

    async createNewAnnouncement(data: any, user_id: number, file: Express.Multer.File) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get data from token!")

        try {

            const isNumberValidate = data != "" && !isNaN(data)

            const validateNumber = isNumberValidate ? Number(data) : 0

            //create an image file detector
            const filebuffer_cloud: any = await BufferUpload(file.buffer, "Image")

            if (!filebuffer_cloud) throw new BadRequestException("Failed to get the buffer for upload in cloudinary!")

            data.Image = filebuffer_cloud.secure_url
            //  

            const data_create = await this.prisma.announcement.create({
                data: {
                    Title: data.Tittle,
                    Content: data.Content,
                    Image: data.Image,
                    AuthorId: user_id,
                    RwId: validateNumber,
                    RtId: validateNumber
                }
            })

            if (!data_create && data_create == undefined || data_create == null) throw new BadRequestException("Failed to create data!")

            return data_create

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async deletAnnouncement(user_id: number, id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the data user from the token!")

        try {

            const isNumber = - id != 0 ? Number(id) : undefined

            const deleteData = await this.prisma.announcement.delete({
                where: {
                    id: isNumber
                }
            })

            if (!deleteData && deleteData == undefined || deleteData == null) throw new BadRequestException("Not found!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateAnnouncement(user_id: number, id: number, data: any, file: Express.Multer.File) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the id from token!")

        try {

            const isNumber = id != 0 ? Number(id) : undefined

            const payload_update = await CheckIsNullAnnouncement(data, file)

            if (payload_update == undefined || payload_update == null) throw new BadRequestException("Failed to get the payload of the data!")

            const update_data_db = await this.prisma.announcement.update({
                where: {
                    id: isNumber
                },
                data: payload_update
            })

            if (!update_data_db && update_data_db == undefined || update_data_db == null) throw new BadRequestException("Failed to update the data because the data is nill!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async getAllAnnouncement(user_id: number, query: any) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get the id from token!")

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
                            { Title: { equals: parsedNumber } },
                            { Content: { equals: parsedNumber } },
                        ] : [])
                    ]
                }
                : {}

            try {

                const [data, total_data] = await Promise.all([
                    this.prisma.announcement.findMany({
                        skip: skip,
                        take: limit,
                        where: where,
                        select: {
                            Title: true,
                            Content: true,
                            Author: true,
                            CreatedAt: true
                        },
                    }),
                    this.prisma.announcement.count({ where: where })
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
                this.prisma.announcement.findMany({
                    skip: skip,
                    take: limit,
                    orderBy: {
                        id: "asc"
                    },
                    select: {
                        Title: true,
                        Content: true,
                        Author: true,
                        CreatedAt: true
                    }
                }),
                this.prisma.announcement.count()
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
