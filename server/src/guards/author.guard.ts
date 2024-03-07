import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (!user || user?.role !== 1 || user?.status !== 1) {
      throw new UnauthorizedException('Not Have Access');
    }
    return true;
  }
}
