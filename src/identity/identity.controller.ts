import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { CurrentUser } from 'src/user/decorators/auth_token.decorator';
import { RolesGuard } from 'src/user/rolesGuard/role.guard';
import { Roles } from 'src/user/decorators/role_decorator';
import { IdentityDto } from 'src/validator/identity_dto';
import type { updateIdentitDto } from 'src/validator/identity_dto';
import { PaginationDto } from 'src/validator/pagination_dto&search';

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
    @Roles("ADMIN_RT")
    async deleteIdentity(@Param('id') id: number) {
        return this.identityService.deleteIdentity(id)
    }

    @Put(":id")
    @UseGuards(JwtAuthGuard)
    async updateIdentity(@Body() data: updateIdentitDto, @CurrentUser() user_id: number, @Param('id') identity_id: number) {
        return this.identityService.updateIdentity(data, identity_id, user_id)
    }

    @Get(":id")
    @UseGuards(JwtAuthGuard)
    async getIdentity(@Param('id') id: number) {
        return this.identityService.getIdentity(id)
    }

    @Get("full_identity")
    @UseGuards(JwtAuthGuard)
    async getAllIdentity(@Query() query: PaginationDto) {

        //debug
        console.log(query)
        console.log(typeof query.page)
        console.log(typeof query.limit)
        //

        return this.identityService.getAllIdentity(query)
    }

}
