import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { SubmissionsService } from './submissions.service.js';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard.js';
import { Roles } from '../common/auth/decorators/roles.decorator.js';
import { RolesGuard } from '../common/auth/guards/roles.guard.js';
import { CreateSubmissionDto } from './dto/submissions.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('submissions')
export class SubmissionsController {

    constructor(private readonly submissionsService: SubmissionsService) { }

    @Post("create")
    @UseInterceptors(FileInterceptor("file", {
        limits: {
            fileSize: 1024 * 1024 * 2
        },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.includes("image")) {
                return cb(new Error("Failed to get the image for data!"), false)
            }
            return cb(null, true)
        }
    }))
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("RT", "RW")
    async createSubmissions(
        @Body() data: CreateSubmissionDto,
        @CurrentUser() user_id: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.submissionsService.createSubmissions(data, user_id, file)
    }

    @Put("update/:id")
    @UseInterceptors(FileInterceptor("file", {
        limits: {
            fileSize: 1024 * 1024 * 2
        },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.includes("image")) {
                return cb(new Error("Failed to get the image for data!"), false)
            }
            return cb(null, true)
        }
    }))
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("RT", "RW")
    async updateSubmissions(
        @Body() data: any,
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser() user_id: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.submissionsService.updateSubmissions(data, id, user_id, file)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("RT", "RW")
    async deleteSubmissions(
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser() user_id: number
    ) {
        return this.submissionsService.deleteSubmissions(user_id, id)
    }

}

