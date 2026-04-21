import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { IdentityModule } from './identity/identity.module';
import { RtController } from './rt/rt.controller';
import { RtService } from './rt/rt.service';

@Module({
  imports: [PrismaModule, UserModule, IdentityModule],
  controllers: [AppController, RtController],
  providers: [AppService, RtService],
})
export class AppModule { }
