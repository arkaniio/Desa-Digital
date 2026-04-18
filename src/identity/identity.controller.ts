import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { CurrentUser } from 'src/user/decorators/auth_token.decorator';
import { RolesGuard } from 'src/user/rolesGuard/role.guard';
import { Roles } from 'src/user/decorators/role_decorator';
import { IdentityDto } from 'src/validator/identity_dto';

@Controller('identity')
export class IdentityController {

    constructor(private readonly identityService: IdentityService) { }

    @UseGuards(JwtAuthGuard)
    @Post("registerIdentity")
    async registerIdentity(@Body() data: IdentityDto, @CurrentUser() req) {
        return this.identityService.registerIdentity(data, req)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(":id")
    @Roles("ADMIN")
    async deleteIdentity(@Param() id: number) {
        return this.identityService.deleteIdentity(id)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(":id")
    @Roles("ADMIN")
    async updateIdentity(@Param() id: number, @Body() data: any) {
        return this.identityService.updateIdentity(data, id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getIdentity(@Param() id: number) {
        return this.identityService.getIdentity(id)
    }

}
