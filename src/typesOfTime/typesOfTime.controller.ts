import { Body, Controller, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';

import { TypesOfTimeService } from './typesOfTime.service';
import { TypesOfTimeDto } from './dto/typesOfTime.dto';
import { ITypesOfTime } from './interfaces/typesOfTime.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Reflector } from '@nestjs/core';
import { ITokenPayload } from '../auth/interfaces/token-payload.interface';

@ApiTags('types-of-time')
@Controller('api/v1/types-of-time')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TypesOfTimeController {

  constructor(private readonly typesOfTimeService: TypesOfTimeService) { }

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Post('/')
  async create(@Request() req, @Body(new ValidationPipe()) typesOfTimeDto: TypesOfTimeDto): Promise<ITypesOfTime> {
    const user: ITokenPayload = req.user;
    return this.typesOfTimeService.create(user, typesOfTimeDto);
  }

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Put('/')
  async update(@Request() req, @Body(new ValidationPipe()) typesOfTimeDto: TypesOfTimeDto): Promise<Boolean> {
    const user: ITokenPayload = req.user;
    return await this.typesOfTimeService.update(user, typesOfTimeDto);
  }

}
