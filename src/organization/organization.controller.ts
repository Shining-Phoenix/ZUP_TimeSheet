import { Body, Request, Controller, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';

import { OrganizationService } from './organization.service';
import { OrganizationDto } from './dto/organization.dto';
import { IOrganization } from './interfaces/organization.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ITokenPayload } from 'src/auth/interfaces/token-payload.interface'

@ApiTags('organization')
@Controller('organization')
export class OrganizationController {

  constructor(private readonly organizationService: OrganizationService) { }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put('/')
  async create(@Request() req, @Body(new ValidationPipe()) organizationDto: OrganizationDto): Promise<IOrganization> {
    const user: ITokenPayload = req.user;
    return this.organizationService.create(user, organizationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async update(@Request() req, @Body(new ValidationPipe()) organizationDto: OrganizationDto): Promise<Boolean> {
    const user: ITokenPayload = req.user;
    return await this.organizationService.update(user, organizationDto);
  }

}
