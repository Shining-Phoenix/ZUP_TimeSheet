import { Body, Controller, Post, Put, ValidationPipe } from '@nestjs/common';

import { SubdivisionService } from './subdivision.service';
import { SubdivisionDto } from './dto/subdivision.dto';
import { ISubdivision } from './interfaces/subdivision.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subdivision')
@Controller('subdivision')
export class SubdivisionController {

  constructor(private readonly subdivisionService: SubdivisionService) { }

  @Put('/')
  async create(@Body(new ValidationPipe()) subdivisionDto: SubdivisionDto): Promise<ISubdivision> {
    return this.subdivisionService.create(subdivisionDto);
  }

  @Post('/')
  async update(@Body(new ValidationPipe()) subdivisionDto: SubdivisionDto): Promise<Boolean> {
    return await this.subdivisionService.update(subdivisionDto);
  }

}
