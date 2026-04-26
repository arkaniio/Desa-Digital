import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller.js';
import { AnnouncementService } from './announcement.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
})
export class AnnouncementModule { }
