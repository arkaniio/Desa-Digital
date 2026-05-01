import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './common/auth/auth.module';
import { UserModule } from './user/user.module';
import { RtModule } from './rt/rt.module';
import { RwModule } from './rw/rw.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { VillageModule } from './village/village.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { DigitalSignatureModule } from './digital_signature/digital_signature.module';

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
    DigitalSignatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

