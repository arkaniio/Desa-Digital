import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { CurrentUser } from 'src/user/decorators/auth_token.decorator';
import { RolesGuard } from 'src/user/rolesGuard/role.guard';
import { Roles } from 'src/user/decorators/role_decorator';
import { IdentityDto } from 'src/validator/identity_dto';
import { NumberType } from 'libphonenumber-js/max';

@Controller('identity')
export class IdentityController {

    constructor(private readonly identityService: IdentityService) { }

    @Post("registerIdentity")
    @UseGuards(JwtAuthGuard)
    async registerIdentity(@Body() data: IdentityDto, @CurrentUser() user_id: number) {

        //debug
        console.log(user_id)
        console.log(data)
        //

        return this.identityService.registerIdentity(data, user_id)
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async deleteIdentity(@Param() id: number) {
        return this.identityService.deleteIdentity(id)
    }

    @Put(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async updateIdentity(@Param() id: number, @Body() data: any) {
        return this.identityService.updateIdentity(data, id)
    }

    @Get(":id")
    @UseGuards(JwtAuthGuard)
    async getIdentity(@Param() id: number) {
        return this.identityService.getIdentity(id)
    }

}
