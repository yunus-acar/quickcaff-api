import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { JwtInterface } from 'src/shared/interface/jwt.interface';
import { UserPayload } from '../users/payloads/user.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.accessTokenSecret'),
      expiresIn: configService.get('jwt.accessTokenExpiresIn'),
    });
  }

  async validate(payload: JwtInterface): Promise<UserPayload> {
    const user = await this.authService.validateUser(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
