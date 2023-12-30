import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalUserStrategy } from './strategies/local-user.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtUserStrategy } from './strategies/jwt-user.strategy';
import { EmailModule } from '../email/email.module';
import { GoogleUserStrategy } from './strategies/google-user.strategy';
import { NaverUserStrategy } from './strategies/naver-user.strategy';

@Module({
  imports: [UserModule, JwtModule.register({}), ConfigModule, EmailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalUserStrategy,
    JwtUserStrategy,
    GoogleUserStrategy,
    NaverUserStrategy,
  ],
})
export class AuthModule {}
