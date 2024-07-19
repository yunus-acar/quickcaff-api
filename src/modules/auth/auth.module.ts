import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.accessTokenSecret'),
        expiresIn: `${configService.get('jwt.accessTokenExpirationTime')}`,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    EmailModule,
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule {}
