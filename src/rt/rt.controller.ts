import { Controller, Post, UseGuards, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { CreateRtDto } from './dto/create-rt.dto';
import { RtService } from './rt.service';
import { UpdateRtDto } from './dto/update-rt.dto';

@Controller('rt')
export class RtController {

    constructor(private readonly RtService: RtService) { }

    @Post('register')
    @Roles("KEPALA_DESA")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async registerRt(@Body() data: CreateRtDto, @CurrentUser() user_id: number) {
        return this.RtService.registerRt(data, user_id)
    }

    @Put("update/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async updateRt(@Body() data: UpdateRtDto, @CurrentUser() user_id: number, @Param('id', ParseIntPipe) id: number) {
        return this.RtService.updateRt(data, user_id, id)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async deleteRt(@Param('id', ParseIntPipe) id: number, @CurrentUser() user_id: number) {
        return this.RtService.deleteRt(user_id, id)
    }

}

