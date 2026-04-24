import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RolesGuard } from 'src/user/rolesGuard/role.guard';
import { Roles } from 'src/user/decorators/role_decorator';
import { CurrentUser } from 'src/user/decorators/auth_token.decorator';

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
