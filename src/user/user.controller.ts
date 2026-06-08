import { Controller, Post, Body, UseGuards, Get, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { FileInterceptor } from "@nestjs/platform-express"
import { Roles, RolesGuard } from '../common/auth';
import { FileInterceptorTools } from '../common/files_tools/file_helper';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser('user_id') user_id: number) {
        return this.userService.getProfile(user_id)
    }

    @Post('create-kepala-desa-account')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("SUPER_ADMIN")
    async createKepalaDesaAccount(@Body() data: any, @CurrentUser('user_id') user_id: number) {
        return this.userService.createKepalaDesaAccount(user_id, data)
    }

    @Put("update")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptorTools)
    async updateProfile(@Body() data: UpdateUserDto, @CurrentUser('user_id') user_id: number, @UploadedFile() file: Express.Multer.File) {
        return this.userService.updateProfile(file, user_id, data)
    }

}

