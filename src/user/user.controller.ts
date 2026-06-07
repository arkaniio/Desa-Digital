import { Controller, Post, Body, UseGuards, Get, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { FileInterceptor } from "@nestjs/platform-express"
import { Roles, RolesGuard } from '../common/auth';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user_id: number) {
        return this.userService.getProfile(user_id)
    }

    @Post('create-kepala-desa-account')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("SUPER_ADMIN")
    async createKepalaDesaAccount(@Body() data: any, @CurrentUser() user_id: number) {
        return this.userService.createKepalaDesaAccount(user_id, data)
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
    async updateProfile(@Body() data: UpdateUserDto, @CurrentUser() user_id: number, @UploadedFile() file: Express.Multer.File) {
        return this.userService.updateProfile(file, user_id, data)
    }

}

