import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExtractJwt } from 'passport-jwt';
import { Role } from 'src/types/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => AuthService)) private AuthService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const jwtFromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    //decode jwtFromHeader
    const { roles: userRoles } = await this.AuthService.decodeAccessToken(
      jwtFromHeader,
    );

    return requireRoles.some((role) => userRoles.includes(role));
  }
}
