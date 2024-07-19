import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokenPayload } from './payloads/token.payload';
import { LoginDto } from './inputs/login.input';
import { UserPayload } from '../users/payloads/user.payload';
import { RegisterDto } from './inputs/register.input';
import { AuthPayload } from './payloads/auth.payload';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Resolver(() => AuthPayload)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Args('data') data: LoginDto): Promise<TokenPayload> {
    return this.authService.login(data);
  }

  @Mutation(() => AuthPayload)
  async register(@Args('data') data: RegisterDto): Promise<TokenPayload> {
    return this.authService.register(data);
  }

  @Mutation(() => TokenPayload)
  async refreshToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<TokenPayload> {
    return this.authService.refreshToken(refreshToken);
  }

  @ResolveField('user', () => UserPayload)
  async user(@Parent() auth: AuthPayload) {
    return this.authService.getUserFromToken(auth.accessToken);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async resendEmailVerification(@Args('email') email: string) {
    return this.authService.sendEmailVerification(email);
  }

  @Mutation(() => Boolean)
  async verifyEmail(@Args('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Args('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Args('token') token: string,
    @Args('password') password: string,
  ) {
    return this.authService.resetPassword(token, password);
  }
}
