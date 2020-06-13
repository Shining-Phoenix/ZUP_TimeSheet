import { Module } from '@nestjs/common';

import { SubdivisionController } from './subdivision.controller';
import { SubdivisionService } from './subdivision.service';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';

@Module({
  controllers: [SubdivisionController],
  providers: [
    SubdivisionService,
    PgPoolService]
})
export class SubdivisionModule {}
