import { Body, Controller, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';

import { PositionService } from './position.service';
import { PositionDto } from './dto/position.dto';
import { IPosition } from './interfaces/position.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Reflector } from '@nestjs/core';
import { ITokenPayload } from '../auth/interfaces/token-payload.interface';

@ApiTags('position')
@Controller('api/v1/position')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PositionController {

  constructor(private readonly positionService: PositionService) { }

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Post('/')
  async create(@Request() req, @Body(new ValidationPipe()) positionDto: PositionDto): Promise<IPosition> {
    const user: ITokenPayload = req.user;
    return this.positionService.create(user, positionDto);
  }

  @Post('/')
  async update(@Request() req, @Body(new ValidationPipe()) positionDto: PositionDto): Promise<Boolean> {
    const user: ITokenPayload = req.user;
    return await this.positionService.update(user, positionDto);
  }

}
