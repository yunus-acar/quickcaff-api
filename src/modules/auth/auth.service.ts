import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserPayload } from '../users/payloads/user.payload';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './inputs/register.input';
import { TokenPayload } from './payloads/token.payload';

import { LoginDto } from './inputs/login.input';
import { Role } from '../users/enum/role.enum';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { EmailService } from '../email/email.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async register(data: RegisterDto): Promise<TokenPayload> {
    const user = await this.usersService.createUser({
      ...data,
      role: Role.User,
    });

    await this.sendEmailVerification(user.email);
    return this.generateTokens({
      sub: user.id,
    });
  }

  async login({ email, password }: LoginDto): Promise<TokenPayload> {
    const user = await this.usersService.validateEmailPassword(email, password);

    if (user.isAccountDisabled) {
      throw new UnauthorizedException('This user account has been disabled');
    }

    return this.generateTokens({
      sub: user.id,
    });
  }

  async validateUser(userId: number): Promise<UserPayload> {
    const user = await this.usersService.getUserById(userId);

    if (user.isAccountDisabled) {
      throw new UnauthorizedException('This user account has been disabled');
    }

    return user;
  }

  private generateAccessToken(payload: { sub: number }): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.accessTokenSecret'),
      expiresIn: this.configService.get('jwt.accessTokenExpirationTime'),
    });
  }

  private generateRefreshToken(payload: { sub: number }): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refreshTokenSecret'),
      expiresIn: this.configService.get('jwt.refreshTokenExpirationTime'),
    });
  }

  generateTokens(payload: { sub: number }): TokenPayload {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  refreshToken(token: string): TokenPayload {
    try {
      const { sub } = this.jwtService.verify(token, {
        secret: this.configService.get('jwt.refreshTokenSecret'),
      });

      return this.generateTokens({
        sub,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  getUserFromToken(token: string): Promise<UserPayload> {
    const id = this.jwtService.verify(token).sub;

    return this.usersService.getUserById(id);
  }

  async sendEmailVerification(email: string): Promise<boolean> {
    try {
      const existingUser = await this.usersService.getUserByEmail(email);

      if (!existingUser) {
        throw new UnauthorizedException('User not found');
      }

      if (existingUser.isEmailVerified) {
        throw new UnauthorizedException('Email already verified');
      }

      const expiresIn = Number(
        this.configService.get('jwt.verificationTokenExpirationTime'),
      );

      const token = this.jwtService.sign(
        { email },
        {
          expiresIn,
          secret: this.configService.get('jwt.verificationTokenSecret'),
        },
      );

      await this.cacheManager.set(
        `email-verification:${token}`,
        email,
        expiresIn,
      );

      await this.emailService.sendEmailVerification(email, token);

      return true;
    } catch (error) {
      return false;
    }
  }

  async verifyEmail(token: string) {
    const email: string = await this.cacheManager.get(
      `email-verification:${token}`,
    );

    if (!email) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    await this.cacheManager.del(`email-verification:${token}`);

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    } else if (user.isEmailVerified) {
      throw new UnauthorizedException('Email already verified');
    }

    return this.usersService.emailVerified(user.id);
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const expiresIn = Number(
      this.configService.get('jwt.passwordResetTokenExpirationTime'),
    );

    const token = this.jwtService.sign(
      { email },
      {
        expiresIn,
        secret: this.configService.get('jwt.passwordResetTokenSecret'),
      },
    );

    await this.cacheManager.set(`password-reset:${token}`, email, expiresIn);

    await this.emailService.sendPasswordReset(email, token);

    return true;
  }

  async resetPassword(token: string, password: string) {
    const email: string = await this.cacheManager.get(
      `password-reset:${token}`,
    );

    if (!email) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    await this.cacheManager.del(`password-reset:${token}`);

    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.usersService.updateUser(user.id, { password });
  }
}
