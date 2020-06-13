import { Controller, Post, Body, ValidationPipe, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { IUser } from '../user/interfaces/user.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signUp')
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<IUser> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signIn')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
    return await this.authService.signIn(signInDto);
  }
}
