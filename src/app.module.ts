import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './common/auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { IdentityModule } from './identity/identity.module.js';
import { RtModule } from './rt/rt.module.js';
import { RwModule } from './rw/rw.module.js';
import { AnnouncementModule } from './announcement/announcement.module.js';
import { VillageModule } from './village/village.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    IdentityModule,
    RtModule,
    RwModule,
    AnnouncementModule,
    VillageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
