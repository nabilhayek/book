import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';
import { JwtRefreshAuthGuard } from './jwt-refresh.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@Context() context) {
    const { refreshToken, userId } = context.req.user;
    return await this.authService.refreshAccessToken(userId, refreshToken);
  }

  @Mutation('login')
  @UseGuards(GqlAuthGuard)
  login(@Context() ctx) {
    return this.authService.login(ctx.user);
  }
}
