import { Body, Controller, Delete, Post, Put, ValidationPipe } from '@nestjs/common';

import { EmployeeWorkplaceHistoryService } from './employeeWorkplaceHistory.service';
import { EmployeeWorkplaceHistoryCreateDto } from './dto/employeeWorkplaceHistoryCreate.dto';
import { EmployeeWorkplaceHistoryDeleteDto } from './dto/employeeWorkplaceHistoryDelete.dto';
import { EmployeeWorkplaceHistoryUpdateDto } from './dto/employeeWorkplaceHistoryUpdate.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('employeeWorkplaceHistory')
@Controller('employeeWorkplaceHistory')
export class EmployeeWorkplaceHistoryController {

  constructor(private readonly employeeWorkplaceHistoryService: EmployeeWorkplaceHistoryService) { }

  @Put('/')
  async create(@Body(new ValidationPipe()) employeeWorkplaceHistoryDto: EmployeeWorkplaceHistoryCreateDto): Promise<Boolean> {
    return this.employeeWorkplaceHistoryService.create(employeeWorkplaceHistoryDto);
  }

  @Post('/')
  async update(@Body(new ValidationPipe()) employeeWorkplaceHistoryDto: EmployeeWorkplaceHistoryUpdateDto): Promise<Boolean> {
    return await this.employeeWorkplaceHistoryService.update(employeeWorkplaceHistoryDto);
  }

  @Delete('/')
  async delete(@Body(new ValidationPipe()) employeeWorkplaceHistoryDto: EmployeeWorkplaceHistoryDeleteDto): Promise<Boolean> {
    return await this.employeeWorkplaceHistoryService.delete(employeeWorkplaceHistoryDto);
  }

}
