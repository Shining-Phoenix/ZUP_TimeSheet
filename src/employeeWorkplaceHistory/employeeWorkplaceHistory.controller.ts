import { Body, Controller, Delete, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';

import { EmployeeWorkplaceHistoryService } from './employeeWorkplaceHistory.service';
import { EmployeeWorkplaceHistoryCreateDto } from './dto/employeeWorkplaceHistoryCreate.dto';
import { EmployeeWorkplaceHistoryDeleteDto } from './dto/employeeWorkplaceHistoryDelete.dto';
import { EmployeeWorkplaceHistoryUpdateDto } from './dto/employeeWorkplaceHistoryUpdate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Reflector } from '@nestjs/core';
import { ITokenPayload } from '../auth/interfaces/token-payload.interface';

@ApiTags('employee-workplace-history')
@Controller('api/v1/employee-workplace-history')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeeWorkplaceHistoryController {

  constructor(private readonly employeeWorkplaceHistoryService: EmployeeWorkplaceHistoryService) { }

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Post('/')
  async create(@Request() req, @Body(new ValidationPipe()) employeeWorkplaceHistoryDto: EmployeeWorkplaceHistoryCreateDto): Promise<Boolean> {
    const user: ITokenPayload = req.user;
    return this.employeeWorkplaceHistoryService.create(user, employeeWorkplaceHistoryDto);
  }

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Put('/')
  async update(@Request() req, @Body(new ValidationPipe()) employeeWorkplaceHistoryDto: EmployeeWorkplaceHistoryUpdateDto): Promise<Boolean> {
    const user: ITokenPayload = req.user;
    return await this.employeeWorkplaceHistoryService.update(user, employeeWorkplaceHistoryDto);
  }

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Delete('/')
  async delete(@Request() req, @Body(new ValidationPipe()) employeeWorkplaceHistoryDto: EmployeeWorkplaceHistoryDeleteDto): Promise<Boolean> {
    const user: ITokenPayload = req.user;
    return await this.employeeWorkplaceHistoryService.delete(user, employeeWorkplaceHistoryDto);
  }

}
