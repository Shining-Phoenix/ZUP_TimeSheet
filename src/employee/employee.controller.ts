import { Body, Controller, Get, Post, Put, Query, Request, UseGuards, ValidationPipe } from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee.dto';
import { IEmployee } from './interfaces/employee.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Reflector } from '@nestjs/core';
import { ITokenPayload } from '../auth/interfaces/token-payload.interface';
import { EmployeeListDto } from './dto/employeeList.dto';

@ApiTags('employee')
@Controller('api/v1/employee')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeeController {

  constructor(private readonly employeeService: EmployeeService) { }

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Post('/')
  async create(@Request() req, @Body(new ValidationPipe()) employeeDto: EmployeeDto): Promise<IEmployee> {
    const user: ITokenPayload = req.user;
    return this.employeeService.create(user, employeeDto);
  }

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Put('/')
  async update(@Request() req, @Body(new ValidationPipe()) employeeDto: EmployeeDto): Promise<Boolean> {
    const user: ITokenPayload = req.user;
    return await this.employeeService.update(user, employeeDto);
  }


  @ApiBearerAuth('access-token')
  @Roles('user', 'admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Get('/employee-list-for-keeper')
  async getEmployeeListForKeeper(@Request() req): Promise<EmployeeListDto[]> {
    const user: ITokenPayload = req.user;
    return await this.employeeService.getEmployeeListForKeeper(user);
  }

  @ApiBearerAuth('access-token')
  @Roles('user', 'admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Get('/employee-list-by-id')
  async getEmployeeById(@Request() req, @Query() params: any): Promise<EmployeeListDto> {
    const user: ITokenPayload = req.user;
    return await this.employeeService.getEmployeeById(user, params.pk);
  }
}
