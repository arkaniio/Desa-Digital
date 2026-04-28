import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';
import { AnnouncementDto } from './dto/announcement.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

}
