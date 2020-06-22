import { Module } from '@nestjs/common';

import { TimeSheetService } from './time-sheet.service';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';
import { TimeSheetController } from './time-sheet.controller';


@Module({
  controllers: [TimeSheetController],
  providers: [
    TimeSheetService,
    PgPoolService]
})
export class TimeSheetModule {}
