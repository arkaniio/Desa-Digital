import { Controller, Post, Body, UseGuards, Get, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service.js';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { UserUpdateDto } from './dto/update-user.dto.js';
import { FileInterceptor } from "@nestjs/platform-express"

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('register')
    async registerUser(@Body() data: CreateUserDto) {
        return this.userService.registerUser(data)
    }

    @Post('login')
    async loginUser(@Body() data: LoginDto) {
        return this.userService.loginUser(data)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user_id: number) {
        return this.userService.getProfile(user_id)
    }

    @Put("update")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("file", {
        limits: {
            fileSize: 1024 * 1024 * 2 // 2 mb
        },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.includes("image")) {
                return cb(new Error("Failed to detect the image file!"), false)
            }
            return cb(null, true)
        },
    }))
    async updateProfile(@Body() data: UserUpdateDto, @CurrentUser() user_id: number, @UploadedFile() file: Express.Multer.File) {
        return this.userService.updateProfile(file, user_id, data)
    }

}

