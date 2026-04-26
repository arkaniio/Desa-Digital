import { Module } from '@nestjs/common';
import { RtController } from './rt.controller.js';
import { RtService } from './rt.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [RtController],
  providers: [RtService],
})
export class RtModule { }
