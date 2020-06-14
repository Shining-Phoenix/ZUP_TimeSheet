import { Module } from '@nestjs/common';

import { TypesOfTimeController } from './typesOfTime.controller';
import { TypesOfTimeService } from './typesOfTime.service';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';

@Module({
  controllers: [TypesOfTimeController],
  providers: [
    TypesOfTimeService,
    PgPoolService]
})
export class TypesOfTimeModule {}
