import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ResponseError, ResponseSuccess } from '../common/helpers/response.helper.js';

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

    async deletAnnouncement(user_id: number, id: number) {

        if (!user_id && id == undefined || user_id && id == null) {
            return ResponseError(
                null,
                HttpStatus.BAD_REQUEST,
                "Failed to get the user id and id for the request!",
                false
            )
        }

        try {

            const deleteData = await this.prisma.announcement.delete({
                where: {
                    id: Number(id)
                }
            })

            if (!deleteData == undefined || deleteData == null) {
                return ResponseError(
                    null,
                    HttpStatus.BAD_REQUEST,
                    "Not found!",
                    false
                )
            }

            return ResponseSuccess(
                true,
                HttpStatus.OK,
                "Successfully to delete the announcement!",
                false
            )

        } catch (error) {
            return ResponseError(
                error,
                HttpStatus.BAD_REQUEST,
                "Failed to delete the data of announcement!",
                false
            )
        }

    }

}
