import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { IUser } from "src/user/interfaces/user.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configService.get<string>('JWT_SECRET'),
        passReqToCallback: true,
    });
  }
}