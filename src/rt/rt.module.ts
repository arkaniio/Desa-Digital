import { Module } from '@nestjs/common';
import { RtController } from './rt.controller';
import { RtService } from './rt.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RtController],
  providers: [RtService],
})
export class RtModule { }
