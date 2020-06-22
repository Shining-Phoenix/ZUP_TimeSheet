import { Injectable, CanActivate, ExecutionContext, HttpStatus, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ITokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const index = roles.indexOf(user.roles[0])

    return index >= 0
  }

  canActivateForUser(user: ITokenPayload, roles): boolean {
    if (!roles) {
      return false;
    }
    const index = roles.indexOf(user.roles[0])

    return index >= 0
  }
}
