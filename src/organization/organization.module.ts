import { Module } from '@nestjs/common';

import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';

@Module({
  controllers: [OrganizationController],
  providers: [
    OrganizationService,
    PgPoolService]
})
export class OrganizationModule {}
