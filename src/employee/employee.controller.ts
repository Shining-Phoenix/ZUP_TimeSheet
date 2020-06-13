import { Body, Controller, Post, Put, ValidationPipe } from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { EmployeeDto } from './dto/employee.dto';
import { IEmployee } from './interfaces/employee.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('employee')
@Controller('employee')
export class EmployeeController {

  constructor(private readonly employeeService: EmployeeService) { }

  @Put('/')
  async create(@Body(new ValidationPipe()) employeeDto: EmployeeDto): Promise<IEmployee> {
    return this.employeeService.create(employeeDto);
  }

  @Post('/')
  async update(@Body(new ValidationPipe()) employeeDto: EmployeeDto): Promise<Boolean> {
    return await this.employeeService.update(employeeDto);
  }

}
