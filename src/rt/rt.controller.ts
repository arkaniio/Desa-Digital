import { Controller, Post, UseGuards, Body, Put, Param, Delete } from '@nestjs/common';
import { CurrentUser } from 'src/user/decorators/auth_token.decorator';
import { Roles } from 'src/user/decorators/role_decorator';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RolesGuard } from 'src/user/rolesGuard/role.guard';
import { RtDto } from 'src/validator/rt_dto';
import { RtService } from './rt.service';
import type { UpdateRtDto } from 'src/validator/rt_dto';
import { Role } from '@prisma/client';

@Controller('rt')
export class RtController {

    constructor(private readonly RtService: RtService) { }

    @Post('register')
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async registerRt(@Body() data: RtDto, @CurrentUser() user_id: number) {
        return this.RtService.registerRt(data, user_id)
    }

    @Put("update/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async updateRt(@Body() data: UpdateRtDto, @CurrentUser() user_id: number, @Param('id') id: number) {

        //debug
        console.log(data)
        console.log(user_id)
        console.log(id)
        console.log(typeof data)
        console.log(typeof user_id)
        console.log(typeof id)
        //

        return this.RtService.updateRt(data, user_id, id)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async deleteRt(@Param('id') id: number, @CurrentUser() user_id: number) {

        //debug
        console.log(id)
        console.log(user_id)
        console.log(typeof id)
        console.log(typeof user_id)
        //

        return this.RtService.deleteRt(user_id, id)
    }

}
