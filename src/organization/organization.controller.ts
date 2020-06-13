import { Body, Controller, Post, Put, ValidationPipe } from '@nestjs/common';

import { OrganizationService } from './organization.service';
import { OrganizationDto } from './dto/organization.dto';
import { IOrganization } from './interfaces/organization.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('organization')
@Controller('organization')
export class OrganizationController {

  constructor(private readonly organizationService: OrganizationService) { }

  @Put('/')
  async create(@Body(new ValidationPipe()) organizationDto: OrganizationDto): Promise<IOrganization> {
    return this.organizationService.create(organizationDto);
  }

  @Post('/')
  async update(@Body(new ValidationPipe()) organizationDto: OrganizationDto): Promise<Boolean> {
    return await this.organizationService.update(organizationDto);
  }

}
