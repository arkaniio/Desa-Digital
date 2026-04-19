import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { CurrentUser } from 'src/user/decorators/auth_token.decorator';
import { RolesGuard } from 'src/user/rolesGuard/role.guard';
import { Roles } from 'src/user/decorators/role_decorator';
import { IdentityDto } from 'src/validator/identity_dto';
import { NumberType } from 'libphonenumber-js/max';
import type { updateIdentitDto } from 'src/validator/identity_dto';

@Controller('identity')
export class IdentityController {

    constructor(private readonly identityService: IdentityService) { }

    @Post("registerIdentity")
    @UseGuards(JwtAuthGuard)
    async registerIdentity(@Body() data: IdentityDto, @CurrentUser() user_id: number) {
        return this.identityService.registerIdentity(data, user_id)
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async deleteIdentity(@Param('id') id: number) {
        return this.identityService.deleteIdentity(id)
    }

    @Put(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async updateIdentity(@Param('id') id: number, @Body() data: updateIdentitDto) {
        return this.identityService.updateIdentity(data, id)
    }

    @Get(":id")
    @UseGuards(JwtAuthGuard)
    async getIdentity(@Param('id') id: number) {

        //debug
        console.log(id)
        //

        return this.identityService.getIdentity(id)
    }

}
