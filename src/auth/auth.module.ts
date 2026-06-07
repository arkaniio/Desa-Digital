import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from '../common/auth/strategies/googleAuth.strategy';
import PasswordService from '../common/services/password/password.service';
import TokenService from '../common/services/token/token.service';
import { PasswordModule } from '../common/services/password/password.module';
import { TokenModule } from '../common/services/token/token.module';

@Module({
  imports: [PasswordModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy]
})
export class AuthModule { }
