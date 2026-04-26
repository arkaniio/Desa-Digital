import { Controller, Post, UseGuards, Body, Put, Param, Delete } from '@nestjs/common';
import { RwService } from './rw.service.js';
import { Roles } from '../common/auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/auth/guards/roles.guard.js';
import { CreateRwDto } from './dto/create-rw.dto.js';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator.js';
import type { UpdateRwDto } from './dto/update-rw.dto.js';

@Controller('rw')
export class RwController {

    constructor(private readonly rwService: RwService) { }

    @Post('register')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async regsiterRw(@Body() data: CreateRwDto, @CurrentUser() user_id: number) {
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
