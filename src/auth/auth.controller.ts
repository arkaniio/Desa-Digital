import { Controller, Get, Post, Req, UseGuards, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto/auth';
import { Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/auth';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async registerUser(@Body() data: CreateUserDto) {
        return this.authService.registerUser(data)
    }

    @Post('login')
    async loginUser(@Body() data: LoginDto) {

        return this.authService.loginUser(data)
    }

    @Put('updatePassword')
    async changePassword(@Body() passwordData: string, @CurrentUser('user_id') user_id: number) {
        return this.authService.changePassword(passwordData, user_id)
    }

    //redirect ke google
    @Get("google")
    @UseGuards(AuthGuard("google"))
    async googleAuth() { }

    //redirect dan callback ke google service url
    @Get("google/callback")
    @UseGuards(AuthGuard("google"))
    async googleCallbackAuth(@Req() req: any) {
        return {
            access_token: req.user
        }
    }
}