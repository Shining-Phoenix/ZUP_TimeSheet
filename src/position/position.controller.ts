import { Body, Controller, Post, Put, ValidationPipe } from '@nestjs/common';

import { PositionService } from './position.service';
import { PositionDto } from './dto/position.dto';
import { IPosition } from './interfaces/position.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('position')
@Controller('position')
export class PositionController {

  constructor(private readonly positionService: PositionService) { }

  @Put('/')
  async create(@Body(new ValidationPipe()) positionDto: PositionDto): Promise<IPosition> {
    return this.positionService.create(positionDto);
  }

  @Post('/')
  async update(@Body(new ValidationPipe()) positionDto: PositionDto): Promise<Boolean> {
    return await this.positionService.update(positionDto);
  }

}
