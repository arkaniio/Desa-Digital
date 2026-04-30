import { Controller, Post, UseGuards, Body, Delete, Param, Put, Get, ParseIntPipe } from '@nestjs/common';
import { VillageService } from './village.service.js';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/auth/guards/roles.guard.js';
import { Roles } from '../common/auth/decorators/roles.decorator.js';
import { CreateVillageDto } from './dto/create-village.dto.js';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator.js';
import { UpdateVillageDto } from './dto/update-village.dto.js';

@Controller('village')
export class VillageController {

    constructor(private readonly villageService: VillageService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async createNewVillage(@Body() data: CreateVillageDto, @CurrentUser() user_id: number) {
        return this.villageService.createNewVillage(data, user_id)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async deleteVillage(@Param('id', ParseIntPipe) id: number, @CurrentUser() user_id: number) {
        return this.villageService.deleteVillage(id, user_id)
    }

    @Put("update/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async updateVillage(@Body() data: UpdateVillageDto, @Param('id', ParseIntPipe) id: number, @CurrentUser() user_id: number) {
        return this.villageService.updateVillage(data, user_id, id)
    }

    @Get("allVillage")
    @UseGuards(JwtAuthGuard)
    async getAllVillage(@CurrentUser() user_id: number) {
        return this.villageService.getAllVillage(user_id)
    }

}

