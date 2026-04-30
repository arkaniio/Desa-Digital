import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './common/auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { RtModule } from './rt/rt.module.js';
import { RwModule } from './rw/rw.module.js';
import { AnnouncementModule } from './announcement/announcement.module.js';
import { VillageModule } from './village/village.module.js';
import { SubmissionsModule } from './submissions/submissions.module.js';
import { DigitalSignatureController } from './digital_signature/digital_signature.controller.js';
import { DigitalSignatureService } from './digital_signature/digital_signature.service.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    RtModule,
    RwModule,
    AnnouncementModule,
    VillageModule,
    SubmissionsModule,
  ],
  controllers: [AppController, DigitalSignatureController],
  providers: [AppService, DigitalSignatureService],
})
export class AppModule { }

