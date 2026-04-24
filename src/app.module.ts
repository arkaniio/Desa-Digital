import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { IdentityModule } from './identity/identity.module';
import { RtController } from './rt/rt.controller';
import { RtService } from './rt/rt.service';
import { RwController } from './rw/rw.controller';
import { RwService } from './rw/rw.service';
import { AnnouncementController } from './announcement/announcement.controller';
import { AnnouncementService } from './announcement/announcement.service';
import { VillageService } from './village/village.service';
import { VillageController } from './village/village.controller';

@Module({
  imports: [PrismaModule, UserModule, IdentityModule],
  controllers: [AppController, RtController, RwController, AnnouncementController, VillageController],
  providers: [AppService, RtService, RwService, AnnouncementService, VillageService],
})
export class AppModule { }
