import { Body, Controller, Post, Put, UploadedFile, UseGuards, UseInterceptors, Param, Get, Query, ParseIntPipe, Delete } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { CurrentUser } from '../common/auth/decorators/current-user.decorator';
import { AnnouncementDto } from './dto/announcement.dto';
import type { UpdateDataAnnouncement } from './dto/announcement.dto';
import { PaginationDto } from '../common/dto/pagination-query.dto';
import { FileInterceptorTools } from '../common/files_tools/file_helper';

@Controller('announcement')
export class AnnouncementController {

    constructor(private readonly announcementService: AnnouncementService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    @UseInterceptors(FileInterceptorTools)
    async createNewAnnouncement(@Body() data: AnnouncementDto,
        @CurrentUser('userId') userId: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.announcementService.createNewAnnouncement(data, userId, file)
    }

    @Put("update/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    @UseInterceptors(FileInterceptorTools)
    async updateAnnouncement(
        @Body() data: UpdateDataAnnouncement,
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser("userId") userId: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.announcementService.updateAnnouncement(userId, id, data, file)
    }

    @Get("all")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("WARGA")
    async getAllAnnouncement(
        @CurrentUser('userId') userId: number,
        @Query('query') query: PaginationDto,
        @Param('id', ParseIntPipe) authorId: number
    ) {
        return this.announcementService.getAllAnnouncement(userId, query, authorId)
    }

    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("KEPALA_DESA")
    async deleteAnnouncement(
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser('userId') userId: number
    ) {
        return this.announcementService.deleteAnnouncement(userId, id)
    }

}
