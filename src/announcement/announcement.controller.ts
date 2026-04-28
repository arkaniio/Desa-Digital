import { Body, Controller, Post, Put, UploadedFile, UseGuards, UseInterceptors, Param, Get, Query } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';
import { AnnouncementDto } from './dto/announcement.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { UpdateDataAnnouncement } from './dto/announcement.dto';
import { PaginationDto } from 'src/common/dto/pagination-query.dto';

@Controller('announcement')
export class AnnouncementController {

    constructor(private readonly announcementService: AnnouncementService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor("file", {
        limits: {
            fileSize: 1024 * 1024 * 2
        },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.includes("image")) {
                return cb(new Error("Failed to detect an image has been invalid!"), false)
            }
            return cb(null, true)
        }
    }))
    @Roles("RT")
    @Roles("RW")
    async createNewAnnouncement(@Body() data: AnnouncementDto,
        @CurrentUser() user_id: number,
        @UploadedFile() file: Express.Multer.File
    ) {

        //debug
        console.log(data)
        console.log(user_id)
        console.log(typeof data)
        console.log(typeof user_id)
        //

        return this.announcementService.createNewAnnouncement(data, user_id, file)
    }

    @Put("update/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor("file", {
        limits: {
            fileSize: 1024 * 1024 * 2
        },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.includes("image")) {
                return cb(new Error("Failed to detect an image has been invalid!"), false)
            }
            return cb(null, true)
        }
    }))
    @Roles("RW")
    @Roles("RT")
    async updateAnnouncement(@Body() data: UpdateDataAnnouncement, @Param('id') id: number, @CurrentUser() user_id: number, @UploadedFile() file: Express.Multer.File) {

        //debug
        console.log(id)
        console.log(data)
        console.log(user_id)
        console.log(file)
        console.log(typeof id)
        console.log(typeof data)
        console.log(typeof user_id)
        console.log(typeof file)
        //

        return this.announcementService.updateAnnouncement(user_id, id, data, file)

    }

    @Get("/all")
    @UseGuards(JwtAuthGuard)
    async getAllAnnouncement(@CurrentUser() user_id: number, @Query() query: PaginationDto) {

        //debug
        console.log(user_id)
        console.log(typeof user_id)
        //

        return this.announcementService.getAllAnnouncement(user_id, query)

    }

}
