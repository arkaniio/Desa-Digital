import { Controller, Post, UseGuards, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RwService } from './rw.service.js';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { CreateRwDto, UpdateRwDto } from './dto/rw.dto.js';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';

@Controller('rw')
export class RwController {

    constructor(private readonly rwService: RwService) { }

    @Post('register')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async regsiterRw(@Body() data: CreateRwDto, @CurrentUser() user_id: number) {
        return this.rwService.registerRw(data, user_id)
    }

    @Put('update/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async updateRw(@Body() data: UpdateRwDto, @CurrentUser() user_id: number, @Param('id', ParseIntPipe) id: number) {
        return this.rwService.updateRw(data, user_id, id)
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async deleteRw(@CurrentUser() user_id: number, @Param('id', ParseIntPipe) id: number) {
        return this.rwService.deleteRw(user_id, id)
    }

}

