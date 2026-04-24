import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { VillageService } from './village.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RolesGuard } from 'src/user/rolesGuard/role.guard';
import { Roles } from 'src/user/decorators/role_decorator';
import { VillageDto } from 'src/validator/village_dto';
import { CurrentUser } from 'src/user/decorators/auth_token.decorator';

@Controller('village')
export class VillageController {

    constructor(private readonly villageService: VillageService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async createNewVillage(@Body() data: VillageDto, @CurrentUser() user_id: number) {

        //debug
        console.log(data)
        console.log(user_id)
        console.log(typeof data)
        console.log(typeof user_id)
        //

        return this.villageService.createNewVillage(data, user_id)
    }

}
