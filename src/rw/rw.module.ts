import { Module } from '@nestjs/common';
import { RwController } from './rw.controller.js';
import { RwService } from './rw.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [RwController],
  providers: [RwService],
})
export class RwModule { }
