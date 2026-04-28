import { Module } from '@nestjs/common';
import { VillageController } from './village.controller';
import { VillageService } from './village.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VillageController],
  providers: [VillageService],
})
export class VillageModule { }
