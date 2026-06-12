import { Controller, Post, UseGuards, Body, Put, Param, Delete, ParseIntPipe, Get, Query } from '@nestjs/common';
import { RwService } from './rw.service.js';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { CreateRwDto, UpdateRwDto } from './dto/rw.dto.js';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';
import { PaginationDto } from '../common/dto/pagination-query.dto.js';

@Controller('rw')
export class RwController {

    constructor(private readonly rwService: RwService) { }

    @Put('update/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async updateRw(
        @Body() data: UpdateRwDto,
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.rwService.updateRw(data, userId, id)
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async deleteRw(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.rwService.deleteRw(userId, id)
    }

    @Get("all")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async getAllRw(
        @CurrentUser('userId') userId: number,
        @Query() query: PaginationDto,
        @Param('village_id', ParseIntPipe) village_id: number
    ) {
        return this.rwService.getAllRw(userId, query, village_id)
    }

}

