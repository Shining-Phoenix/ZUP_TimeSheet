import { Injectable, UnauthorizedException, BadRequestException, MethodNotAllowedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignOptions } from 'jsonwebtoken';
import { roleEnum } from 'src/user/enums/role.enum';
import { IUser } from 'src/user/interfaces/user.interface';
import { statusEnum } from 'src/user/enums/status.enum';
import { SignInDto } from './dto/signin.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { userSensitiveFieldsEnum } from 'src/user/enums/protected-fields.enum';
import { ITokenPayload } from 'src/auth/interfaces/token-payload.interface'

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<IUser> {
    const user = await this.userService.create(createUserDto, [roleEnum.user]);
    return user;
  }

  async signIn({ email, password }: SignInDto): Promise<IReadableUser> {
    const user = await this.userService.findByEmail(email);

    if (user && user.pk!=-1 && (await bcrypt.compare(password, user.password))) {
      if (user.status !== statusEnum.active) {
        throw new MethodNotAllowedException();
      }

      const expiresIn = 60 * 60 * 24

      const tokenPayload: ITokenPayload = {
        pk: user.pk,
        status: user.status,
        roles: user.roles,
        expiresIn,
        base_pk: user.base_pk
      };

      const token = await this.generateToken(tokenPayload, {expiresIn});

      const readableUser: IReadableUser =  {
            email: user.email,
            status: user.status,
            lastName: user.lastName,
            firstName: user.firstName,
            patronymic: user.patronymic,
            roles: user.roles,
            accessToken: 'Bearer ' + token,
            expiresIn
       };

      return _.omit<any>(readableUser, Object.values(userSensitiveFieldsEnum)) as IReadableUser;
    }
    throw new BadRequestException('Invalid credentials');
  }

  private async generateToken(data, options?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }

}
