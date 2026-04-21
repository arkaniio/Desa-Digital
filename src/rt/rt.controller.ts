import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { CurrentUser } from 'src/user/decorators/auth_token.decorator';
import { Roles } from 'src/user/decorators/role_decorator';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RolesGuard } from 'src/user/rolesGuard/role.guard';
import { RtDto } from 'src/validator/rt_dto';
import { RtService } from './rt.service';

@Controller('rt')
export class RtController {

    constructor(private readonly RtService: RtService) { }

    @Post()
    @Roles("ADMIN")
    @UseGuards(JwtAuthGuard, RolesGuard)
    async registerRt(@Body() data: RtDto, @CurrentUser() user_id: number) {

        //debug
        console.log(data)
        console.log(user_id)
        //

        return this.RtService.registerRt(data, user_id)
    }

}
