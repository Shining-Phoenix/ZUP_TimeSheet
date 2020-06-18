import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Query,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { IUser } from '../user/interfaces/user.interface';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Reflector } from '@nestjs/core';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Post('/signUp')
  async signUp(@Request() req, @Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<IUser> {

    //ToDo Разобраться
    const rolesGuard = new RolesGuard(new Reflector());
    if (!rolesGuard.canActivateForUser(req.user, ['admin'])){
      throw new BadRequestException('Invalid credentials')
    }

    const base_pk: number = req.user.base_pk;
    return this.authService.signUp(base_pk, createUserDto);
  }

  @Post('/signIn')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
    return await this.authService.signIn(signInDto);
  }
}
