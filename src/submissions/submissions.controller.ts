import { Body, Controller, Get, Delete, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from '../common/dto/pagination-query.dto';
import { CreateSubmissionDto, UpdateKepalaDesaSignSubmissions, UpdateRtSignSubmissions, UpdateSubmissionsDto } from './dto/submissions.dto';

@Controller('submissions')
export class SubmissionsController {

    constructor(private readonly submissionsService: SubmissionsService) { }

    @Get("all")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("WARGA")
    async getAllSubmissions(@CurrentUser() user_id: number, @Query() query: PaginationDto) {
        return this.submissionsService.getAllSubmissions(user_id, query)
    }

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
    @Roles("WARGA")
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
    @Roles("WARGA")
    async updateSubmissions(
        @Body() data: UpdateSubmissionsDto,
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser() user_id: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.submissionsService.updateSubmissions(data, id, user_id, file)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("WARGA")
    async deleteSubmissions(
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser() user_id: number
    ) {
        return this.submissionsService.deleteSubmissions(user_id, id)
    }

    @Put("permissions_rt/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("RT")
    async updateSubmissionsWithRt(@Body() data: UpdateRtSignSubmissions,
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser() user_id: number
    ) {
        return this.submissionsService.updateSubmissionsWithRt(user_id, data, id)
    }

    @Put("permissions_kepdes/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async updateSubmissionsWithKepalaDesa(
        @Body() data: UpdateKepalaDesaSignSubmissions, @Param('id', ParseIntPipe) id: number,
        @CurrentUser() user_id: number
    ) {
        return this.submissionsService.updateSubmissionsWithKepalaDesa(user_id, data, id)
    }

    @Get("verify_submissions")
    async verifySubmission(signature: string) {
        return this.submissionsService.verifySubmission(signature)
    }

}

