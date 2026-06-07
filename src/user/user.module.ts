import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PasswordModule } from '../common/services/password/password.module';

@Module({
  imports: [
    PrismaModule, PasswordModule
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule { }
