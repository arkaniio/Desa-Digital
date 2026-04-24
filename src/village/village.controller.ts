import { Controller, Post, UseGuards, Body, Delete, Param, Put } from '@nestjs/common';
import { VillageService } from './village.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RolesGuard } from 'src/user/rolesGuard/role.guard';
import { Roles } from 'src/user/decorators/role_decorator';
import { VillageDto } from 'src/validator/village_dto';
import { CurrentUser } from 'src/user/decorators/auth_token.decorator';
import type { UpdateVillage } from 'src/validator/village_dto';

@Controller('village')
export class VillageController {

    constructor(private readonly villageService: VillageService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async createNewVillage(@Body() data: VillageDto, @CurrentUser() user_id: number) {
        return this.villageService.createNewVillage(data, user_id)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async deleteVillage(@Param('id') id: number, @CurrentUser() user_id: number) {

        //debug
        console.log(typeof id)
        console.log(id)
        //

        return this.villageService.deleteVillage(id, user_id)
    }

    @Put("update/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async updateVillage(@Body() data: UpdateVillage, @Param('id') id: number, @CurrentUser() user_id: number) {

        //debug
        console.log(data)
        console.log(user_id)
        console.log(id)
        console.log(typeof data)
        console.log(typeof user_id)
        console.log(typeof id)
        //

        return this.villageService.updateVillage(data, user_id, id)
    }

}
