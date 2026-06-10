import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthModule } from './common/auth/jwt.module';
import { UserModule } from './user/user.module';
import { RtModule } from './rt/rt.module';
import { RwModule } from './rw/rw.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { VillageModule } from './village/village.module';
import { SubmissionsModule } from './submissions/submissions.module';
import BoostrapService from './common/services/bootstrap/bootstrap.service';
import { BootstrapModule } from './common/services/bootstrap/bootstrap.module';
import { PasswordModule } from './common/services/password/password.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './super_admin/admin.module';

@Module({
  imports: [
    AdminModule,
    JwtAuthModule,
    AuthModule,
    DashboardModule,
    BootstrapModule,
    PasswordModule,
    PrismaModule,
    UserModule,
    RtModule,
    RwModule,
    AnnouncementModule,
    VillageModule,
    SubmissionsModule,
  ],
  controllers: [AppController],
  providers: [BoostrapService, AppService],
})
export class AppModule { }

