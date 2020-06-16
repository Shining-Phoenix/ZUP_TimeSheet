import { Module } from '@nestjs/common';

import { EmployeeWorkplaceHistoryController } from './employeeWorkplaceHistory.controller';
import { EmployeeWorkplaceHistoryService } from './employeeWorkplaceHistory.service';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';

@Module({
  controllers: [EmployeeWorkplaceHistoryController],
  providers: [
    EmployeeWorkplaceHistoryService,
    PgPoolService]
})
export class EmployeeWorkplaceHistoryModule {}
