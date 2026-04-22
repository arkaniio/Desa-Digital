import { Controller, Post, UseGuards, Body, Put, Param, Delete } from '@nestjs/common';
import { RwService } from './rw.service';
import { Roles } from 'src/user/decorators/role_decorator';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RolesGuard } from 'src/user/rolesGuard/role.guard';
import { RwDto } from 'src/validator/rw_dto';
import { CurrentUser } from 'src/user/decorators/auth_token.decorator';
import type { UpdateRwDto } from 'src/validator/rw_dto';

@Controller('rw')
export class RwController {

    constructor(private readonly rwService: RwService) { }

    @Post('register')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async regsiterRw(@Body() data: RwDto, @CurrentUser() user_id: number) {
        return this.rwService.registerRw(data, user_id)
    }

    @Put('update/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async updateRw(@Body() data: UpdateRwDto, @CurrentUser() user_id: number, @Param('id') id: number) {
        return this.rwService.updateRw(data, user_id, id)
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async deleteRw(@CurrentUser() user_id: number, @Param('id') id: number) {
        return this.rwService.deleteRw(user_id, id)
    }

}
