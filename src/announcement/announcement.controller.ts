import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';

@Controller('announcement')
export class AnnouncementController {

    constructor(private readonly announcementService: AnnouncementService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("RT")
    @Roles("RW")
    async createNewAnnouncement(@Body() data: AnnouncementService, @CurrentUser() user_id: number) {

        //debug
        console.log(data)
        console.log(user_id)
        //

        return this.announcementService.createNewAnnouncement(data, user_id)
    }

}
