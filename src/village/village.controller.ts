import { Controller, Post, UseGuards, Body, Delete, Param, Put, Get } from '@nestjs/common';
import { VillageService } from './village.service';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { CreateVillageDto } from './dto/create-village.dto';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';
import type { UpdateVillageDto } from './dto/update-village.dto';

@Controller('village')
export class VillageController {

    constructor(private readonly villageService: VillageService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async createNewVillage(@Body() data: CreateVillageDto, @CurrentUser() user_id: number) {
        return this.villageService.createNewVillage(data, user_id)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async deleteVillage(@Param('id') id: number, @CurrentUser() user_id: number) {
        return this.villageService.deleteVillage(id, user_id)
    }

    @Put("update/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async updateVillage(@Body() data: UpdateVillageDto, @Param('id') id: number, @CurrentUser() user_id: number) {
        return this.villageService.updateVillage(data, user_id, id)
    }

    @Get("allVillage")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles()
    async getAllVillage(@CurrentUser() user_id: number) {
        return this.villageService.getAllVillage(user_id)
    }

}
