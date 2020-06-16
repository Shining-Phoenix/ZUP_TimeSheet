import { Module } from '@nestjs/common';

import { WorkSchedulesController } from './workSchedules.controller';
import { WorkSchedulesService } from './workSchedules.service';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';

@Module({
  controllers: [WorkSchedulesController],
  providers: [
    WorkSchedulesService,
    PgPoolService]
})
export class WorkSchedulesModule {}
