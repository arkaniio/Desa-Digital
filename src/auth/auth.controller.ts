import { Controller, Get, Post, Req, UseGuards, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto, CreateUserDto, LoginDto } from './dto/auth';
import { Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser, JwtAuthGuard } from '../common/auth';
import { GoogleOAuthGuard } from '../common/auth/guards/google-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async registerUser(
        @Body() data: CreateUserDto
    ) {
        return this.authService.registerUser(data)
    }

    @Post('login')
    async loginUser(
        @Body() data: LoginDto
    ) {
        return this.authService.loginUser(data)
    }

    @Put('updatePassword')
    @UseGuards(JwtAuthGuard)
    async changePassword(
        @Body() data: any,
        @CurrentUser('userId') userId: number
    ) {
        return this.authService.changePassword(data, userId)
    }

    //redirect ke google
    @Get("google")
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(
        @Req() req
    ) { }

    //redirect dan callback ke google service url
    @Get("google/callback")
    @UseGuards(GoogleOAuthGuard)
    async googleCallbackAuth(
        @Req() req: any
    ) {
        return {
            data: req.user
        }
    }
}