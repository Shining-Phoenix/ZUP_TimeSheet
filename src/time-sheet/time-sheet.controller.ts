import { Body, Controller, Get, Post, Put, Query, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Reflector } from '@nestjs/core';

import { ITokenPayload } from '../auth/interfaces/token-payload.interface';
import { TimeSheetService } from './time-sheet.service';
import { ITimeSheet } from './interfaces/timeSheet.interface';

@ApiTags('types-of-time')
@Controller('api/v1/time-sheet')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TimeSheetController {

  constructor(private readonly timeSheetService: TimeSheetService) { }

  @ApiBearerAuth('access-token')
  @Roles('user')
  @UseGuards(new RolesGuard(new Reflector()))
  @Get('/time-sheet-list-for-keeper')
  async getTimeSheetListForKeeper(@Request() req): Promise<ITimeSheet[]> {
    const user: ITokenPayload = req.user;
    return this.timeSheetService.getTimeSheetListForKeeper(user);
  }


  @ApiBearerAuth('access-token')
  @Roles('user')
  @UseGuards(new RolesGuard(new Reflector()))
  @Get('/time-sheet-list-by-id')
  async getTimeSheetListById(@Request() req, @Query() params: any): Promise<ITimeSheet> {
    const user: ITokenPayload = req.user;
    return this.timeSheetService.getTimeSheetListById(user, params.timeSheetPk);
  }
}


