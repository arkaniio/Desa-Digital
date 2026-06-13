import { Controller, Post, UseGuards, Body, Put, Param, Delete, ParseIntPipe, Get, Query } from '@nestjs/common';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { CreateRtDto, UpdateRtDto } from './dto/rt.dto';
import { RtService } from './rt.service';
import { PaginationDto } from '../common/dto/pagination-query.dto';

@Controller('rt')
export class RtController {

    constructor(private readonly RtService: RtService) { }

    @Put("update/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async updateRt(
        @Body() data: UpdateRtDto,
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.RtService.updateRt(data, userId, id)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async deleteRt(
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser('userId') userId: number
    ) {
        return this.RtService.deleteRt(userId, id)
    }
}

