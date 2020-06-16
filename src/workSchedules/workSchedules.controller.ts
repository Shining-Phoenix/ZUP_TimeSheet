import { Body, Controller, Post, Put, ValidationPipe } from '@nestjs/common';

import { WorkSchedulesService } from './workSchedules.service';
import { WorkSchedulesDto } from './dto/workSchedules.dto';
import { IWorkSchedules } from './interfaces/workSchedules.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('workSchedules')
@Controller('workSchedules')
export class WorkSchedulesController {

  constructor(private readonly workSchedulesService: WorkSchedulesService) { }

  @Put('/')
  async create(@Body(new ValidationPipe()) workSchedulesDto: WorkSchedulesDto): Promise<IWorkSchedules> {
    return this.workSchedulesService.create(workSchedulesDto);
  }

  @Post('/')
  async update(@Body(new ValidationPipe()) workSchedulesDto: WorkSchedulesDto): Promise<Boolean> {
    return await this.workSchedulesService.update(workSchedulesDto);
  }

}
