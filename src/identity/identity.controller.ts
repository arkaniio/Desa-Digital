import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service.js';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator.js';
import { RolesGuard } from '../common/auth/guards/roles.guard.js';
import { Roles } from '../common/auth/decorators/roles.decorator.js';
import { CreateIdentityDto } from './dto/create-identity.dto.js';
import type { UpdateIdentityDto } from './dto/update-identity.dto.js';
import { PaginationDto } from '../common/dto/pagination-query.dto.js';

@Controller('identity')
export class IdentityController {

    constructor(private readonly identityService: IdentityService) { }

    @Get("full")
    @Roles()
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAllIdentity(@Query() query: PaginationDto) {
        return this.identityService.getAllIdentity(query)
    }

    @Post("registerIdentity")
    @UseGuards(JwtAuthGuard)
    async registerIdentity(@Body() data: CreateIdentityDto, @CurrentUser() user_id: number) {
        return this.identityService.registerIdentity(data, user_id)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async deleteIdentity(@Param('id') id: number) {
        return this.identityService.deleteIdentity(id)
    }

    @Put("update/:id")
    @UseGuards(JwtAuthGuard)
    async updateIdentity(@Body() data: UpdateIdentityDto, @CurrentUser() user_id: number, @Param('id') identity_id: number) {
        return this.identityService.updateIdentity(data, identity_id, user_id)
    }

    @Get("get/:id")
    @UseGuards(JwtAuthGuard)
    async getIdentity(@Param('id') id: number) {
        return this.identityService.getIdentity(id)
    }

}
