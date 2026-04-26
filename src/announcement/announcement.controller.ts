import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AnnouncementService } from './announcement.service.js';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/auth/guards/roles.guard.js';
import { Roles } from '../common/auth/decorators/roles.decorator.js';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator.js';

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
