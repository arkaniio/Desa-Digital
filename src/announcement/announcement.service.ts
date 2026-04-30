import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BufferUpload } from '../common/helpers/cloudinary_helper';
import { CheckIsNullWitMulterAnnouncement } from '../common/helpers/null-check.helper';

@Injectable()
export class AnnouncementService {

    constructor(private prisma: PrismaService) { }

    async createNewAnnouncement(data: any, user_id: number, file: Express.Multer.File) {

        if (user_id == null) throw new UnauthorizedException("Failed to get data from token!")

        try {

            //create an image file detector
            const filebuffer_cloud: any = await BufferUpload(file.buffer, "Image")

            if (!filebuffer_cloud) throw new BadRequestException("Failed to get the buffer for upload in cloudinary!")

            const data_Image = filebuffer_cloud.secure_url
            //  

            const data_create = await this.prisma.announcement.create({
                data: {
                    Title: data.Tittle,
                    Content: data.Content,
                    Image: data_Image,
                    AuthorId: user_id,
                    RwId: Number(data.RwId),
                    RtId: Number(data.RtId)
                }
            })

            if (!data_create) throw new BadRequestException("Failed to create data!")

            return data_create

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async deletAnnouncement(user_id: number, id: number) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the data user from the token!")

        try {

            const deleteData = await this.prisma.announcement.delete({
                where: {
                    id: Number(id)
                }
            })

            if (!deleteData) throw new BadRequestException("Not found!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateAnnouncement(user_id: number, id: number, data: any, file: Express.Multer.File) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the id from token!")

        try {

            const payload_update = await CheckIsNullWitMulterAnnouncement(data, file, "Announcement")

            if (!payload_update || Object.keys(payload_update).length === 0) throw new BadRequestException("Failed to get the payload of the data!")

            const update_data_db = await this.prisma.announcement.update({
                where: {
                    id: Number(id)
                },
                data: payload_update
            })

            if (!update_data_db) throw new BadRequestException("Failed to update the data because the data is nill!")

            return true

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async getAllAnnouncement(user_id: number, query: any) {

        if (user_id == null) throw new UnauthorizedException("Failed to get the id from token!")

        const { page, limit, search_query } = query

        const skip = (page - 1) * limit

        if (search_query) {

            const where: any = {
                OR: [
                    {
                        Title: {
                            contains: search_query,
                            mode: "insensitive"
                        }
                    },
                    {
                        Content: {
                            contains: search_query,
                            mode: "insensitive"
                        }
                    }
                ]
            }

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

                if (!data) throw new BadRequestException("Failed to get the total data and data!")

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

            if (!data) throw new BadRequestException("Failed to get the data and total data!")

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

