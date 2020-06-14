import { Body, Controller, Post, Put, ValidationPipe } from '@nestjs/common';

import { TypesOfTimeService } from './typesOfTime.service';
import { TypesOfTimeDto } from './dto/typesOfTime.dto';
import { ITypesOfTime } from './interfaces/typesOfTime.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('typesOfTime')
@Controller('typesOfTime')
export class TypesOfTimeController {

  constructor(private readonly typesOfTimeService: TypesOfTimeService) { }

  @Put('/')
  async create(@Body(new ValidationPipe()) typesOfTimeDto: TypesOfTimeDto): Promise<ITypesOfTime> {
    return this.typesOfTimeService.create(typesOfTimeDto);
  }

  @Post('/')
  async update(@Body(new ValidationPipe()) typesOfTimeDto: TypesOfTimeDto): Promise<Boolean> {
    return await this.typesOfTimeService.update(typesOfTimeDto);
  }

}
