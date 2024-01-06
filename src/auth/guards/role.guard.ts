import { Role } from '../../user/entities/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtUserGuard } from './jwt-user.guard';
import { RequestWithUser } from '../interfaces/requestWithUser.interface';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtUserGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const req = context.switchToHttp().getRequest<RequestWithUser>();
      const user = req.user;

      return user?.roles.includes(role);
    }
  }
  return mixin(RoleGuardMixin);
};
