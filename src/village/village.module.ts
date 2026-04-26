import { Module } from '@nestjs/common';
import { VillageController } from './village.controller.js';
import { VillageService } from './village.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [VillageController],
  providers: [VillageService],
})
export class VillageModule { }
