import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from 'src/types/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  @UseGuards(GqlAuthGuard)
  login(@Context() ctx) {
    return this.authService.login(ctx.user);
  }
}
