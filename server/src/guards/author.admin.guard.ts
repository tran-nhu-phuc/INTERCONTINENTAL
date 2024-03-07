import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
@Injectable()
export class RoleAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { admin } = context.switchToHttp().getRequest();
    if (!admin || admin?.role !== 2 || admin?.status !== 1) {
      throw new UnauthorizedException('Not Have Access');
    }
    return true;
  }
}
