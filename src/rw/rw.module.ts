import { Module } from '@nestjs/common';
import { RwController } from './rw.controller';
import { RwService } from './rw.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RwController],
  providers: [RwService],
})
export class RwModule { }
