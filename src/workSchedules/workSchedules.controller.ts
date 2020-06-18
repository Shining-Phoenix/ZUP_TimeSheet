import { Body, Controller, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';

import { WorkSchedulesService } from './workSchedules.service';
import { WorkSchedulesDto } from './dto/workSchedules.dto';
import { IWorkSchedules } from './interfaces/workSchedules.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Reflector } from '@nestjs/core';
import { ITokenPayload } from '../auth/interfaces/token-payload.interface';

@ApiTags('work-schedules')
@Controller('api/v1/work-schedules')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorkSchedulesController {

  constructor(private readonly workSchedulesService: WorkSchedulesService) { }

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Post('/')
  async create(@Request() req, @Body(new ValidationPipe()) workSchedulesDto: WorkSchedulesDto): Promise<IWorkSchedules> {
    const user: ITokenPayload = req.user;
    return this.workSchedulesService.create(user, workSchedulesDto);
  }

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Put('/')
  async update(@Request() req, @Body(new ValidationPipe()) workSchedulesDto: WorkSchedulesDto): Promise<Boolean> {
    const user: ITokenPayload = req.user;
    return await this.workSchedulesService.update(user, workSchedulesDto);
  }

}
