import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseError, ResponseSuccess } from 'src/utils/response_status';

@Injectable()
export class AnnouncementService {

    constructor(private prisma: PrismaService) { }

    async createNewAnnouncement(data: any, user_id: number) {

        if (user_id == undefined || user_id == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the user id in auth!",
                false
            )
        }

        if (data == undefined || data == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the data in request body!",
                false
            )
        }

        try {

            const data_create = await this.prisma.announcement.create({
                data: {
                    Title: data.Tittle,
                    Content: data.Content,
                    AuthorId: user_id,
                    RwId: Number(data.RwId),
                    RtId: Number(data.RtId)
                }
            })

            if (!data_create == undefined || data_create == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Failed to create new announcement because the data that you send is nil!",
                    false
                )
            }

            return ResponseSuccess(
                data_create,
                HttpStatus.OK,
                "Successfully to create new data announcement!",
                true
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to create new announcement!",
                false
            )
        }

    }

}
