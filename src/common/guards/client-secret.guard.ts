import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ClientSecretGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const clientSecret = request.headers['x-lumina-client-secret'];

    if (clientSecret !== process.env.FRONTEND_CLIENT_SECRET) {
      throw new UnauthorizedException('Access denied');
    }

    return true;
  }
}
