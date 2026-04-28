import { Controller, Post, Body, UseGuards, Get, Put, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import type { UserUpdateDto } from './dto/update-user.dto';
import { FileInterceptor } from "@nestjs/platform-express"

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('register')
    async registerUser(@Body() data: CreateUserDto) {

        //debug
        console.log(data)
        console.log(typeof data)
        //

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

        //debug
        console.log(file)
        console.log(data)
        console.log(user_id)
        console.log(typeof file)
        console.log(typeof data)
        console.log(typeof user_id)
        //

        return this.userService.updateProfile(file, user_id, data)
    }

}
