import { Controller, Get, Post, Req, UseGuards, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto, CreateUserDto, LoginDto } from './dto/auth';
import { Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, JwtAuthGuard } from '../common/auth';

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
    @UseGuards(JwtAuthGuard)
    async changePassword(@Body() data: any, @CurrentUser('userId') userId: number) {

        console.log(data)

        return this.authService.changePassword(data, userId)
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