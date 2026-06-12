import { Controller, Post, UseGuards, Body, Delete, Param, Put, Get, ParseIntPipe } from '@nestjs/common';
import { VillageService } from './village.service';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { CreateVillageDto, UpdateVillageDto } from './dto/village.dto';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';

@Controller('village')
export class VillageController {

    constructor(private readonly villageService: VillageService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async createNewVillage(
        @Body() data: CreateVillageDto,
        @CurrentUser('userId') userId: number
    ) {
        return this.villageService.createNewVillage(data, userId)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async deleteVillage(
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser('userId') userId: number
    ) {
        return this.villageService.deleteVillage(id, userId)
    }

    @Put("update/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async updateVillage(
        @Body() data: UpdateVillageDto,
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser('userId') userId: number
    ) {
        return this.villageService.updateVillage(data, userId, id)
    }

    @Get("allVillage")
    @UseGuards(JwtAuthGuard)
    async getAllVillage(
        @CurrentUser('userId') userId: number
    ) {
        return this.villageService.getAllVillage(userId)
    }

}

