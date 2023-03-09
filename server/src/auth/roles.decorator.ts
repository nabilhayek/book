import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from 'src/types/graphql';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

export const Roles = (...roles: Role[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
};
