import { Body, Request, Controller, Post, Put, UseGuards, ValidationPipe, Get } from '@nestjs/common';

import { OrganizationService } from './organization.service';
import { OrganizationDto } from './dto/organization.dto';
import { IOrganization } from './interfaces/organization.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ITokenPayload } from 'src/auth/interfaces/token-payload.interface'
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('organization')
@Controller('api/v1/organization')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrganizationController {

  constructor(private readonly organizationService: OrganizationService) { }

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Post('/')
  async create(@Request() req, @Body(new ValidationPipe()) organizationDto: OrganizationDto): Promise<IOrganization> {
    const user: ITokenPayload = req.user;
    return this.organizationService.create(user, organizationDto);
  }

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  @Put('/')
  async update(@Request() req, @Body(new ValidationPipe()) organizationDto: OrganizationDto): Promise<Boolean> {
    const user: ITokenPayload = req.user;
    return await this.organizationService.update(user, organizationDto);
  }

  @ApiBearerAuth('access-token')
  @Roles('user')
  @UseGuards(new RolesGuard(new Reflector()))
  @Get('/')
  async get(@Request() req): Promise<IOrganization[]> {
    const user: ITokenPayload = req.user;
    return await this.organizationService.get(user);
  }

}
