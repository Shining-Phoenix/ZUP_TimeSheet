import { Module } from '@nestjs/common';

import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';

@Module({
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    PgPoolService]
})
export class EmployeeModule {}
