import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnnouncementService {

    constructor(private prisma: PrismaService) { }

    async createNewAnnouncement(data: any, user_id: number) {

        if (!user_id && user_id == undefined || user_id == null) throw new UnauthorizedException("Failed to get data from token!")

        try {

            const isNumberValidate = data != "" && !isNaN(data)

            const validateNumber = isNumberValidate ? Number(data) : 0

            const data_create = await this.prisma.announcement.create({
                data: {
                    Title: data.Tittle,
                    Content: data.Content,
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

}
