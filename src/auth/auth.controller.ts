import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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