import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { RwService } from './rw.service';
import { Roles } from 'src/user/decorators/role_decorator';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RolesGuard } from 'src/user/rolesGuard/role.guard';
import { RwDto } from 'src/validator/rw_dto';
import { CurrentUser } from 'src/user/decorators/auth_token.decorator';

@Controller('rw')
export class RwController {

    constructor(private readonly rwService: RwService) { }

    @Post('register')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async regsiterRw(@Body() data: RwDto, @CurrentUser() user_id: number) {
        return this.rwService.registerRw(data, user_id)

    }

}
