import { Body, Controller, Get, Delete, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from '../common/dto/pagination-query.dto';
import { CreateSubmissionDto, UpdateKepalaDesaSignSubmissions, UpdateRtSignSubmissions, UpdateSubmissionsDto } from './dto/submissions.dto';
import { FileInterceptorTools } from '../common/files_tools/file_helper';

@Controller('submissions')
export class SubmissionsController {

    constructor(private readonly submissionsService: SubmissionsService) { }

    @Get("all")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("WARGA")
    async getAllSubmissions(
        @CurrentUser('userId') userId: number,
        @Query('query') query: PaginationDto
    ) {
        return this.submissionsService.getAllSubmissions(userId, query)
    }

    @Post("create")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("WARGA")
    @UseInterceptors(FileInterceptorTools)
    async createSubmissions(
        @Body() data: CreateSubmissionDto,
        @CurrentUser('userId') userId: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.submissionsService.createSubmissions(data, userId, file)
    }

    @Put("update/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("WARGA")
    @UseInterceptors(FileInterceptorTools)
    async updateSubmissions(
        @Body() data: UpdateSubmissionsDto,
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser('userId') userId: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.submissionsService.updateSubmissions(data, id, userId, file)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("WARGA")
    async deleteSubmissions(
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser("userId") userId: number
    ) {
        return this.submissionsService.deleteSubmissions(userId, id)
    }

    @Put("permissions_rt/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("RT")
    async updateSubmissionsWithRt(@Body() data: UpdateRtSignSubmissions,
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser("userId") userId: number
    ) {
        return this.submissionsService.updateSubmissionsWithRt(userId, data, id)
    }

    @Put("permissions_kepdes/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async updateSubmissionsWithKepalaDesa(
        @Body() data: UpdateKepalaDesaSignSubmissions,
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser("userId") userId: number
    ) {
        return this.submissionsService.updateSubmissionsWithKepalaDesa(userId, data, id)
    }

    @Get("verify_submissions")
    async verifySubmission(
        signature: string
    ) {
        return this.submissionsService.verifySubmission(signature)
    }

}

