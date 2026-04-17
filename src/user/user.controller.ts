import { Controller, Post, Body, UseGuards, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './decorators/auth_token.decorator';
import { CreateUserDto } from 'src/validator/create_user_dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('register')
    async registerUser(@Body() data: CreateUserDto) {
        return this.userService.registerUser(data)
    }

    @Post('login')
    async loginUser(@Body() data: any) {
        return this.userService.loginUser(data)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user_id: number) {
        return this.userService.getProfile(user_id)
    }

    @Put("update")
    @UseGuards(JwtAuthGuard)
    async updateProfile(@Body() data: any, @CurrentUser() user_id: number) {
        return this.userService.updateProfile(data, user_id)
    }

}
