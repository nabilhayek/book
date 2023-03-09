import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './jwt.strategy';
import { RtStrategy } from './rt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PassportModule, UserModule, JwtModule],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RtStrategy,
  ],
})
export class AuthModule {}
