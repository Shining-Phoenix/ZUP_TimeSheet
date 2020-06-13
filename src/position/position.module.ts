import { Module } from '@nestjs/common';

import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';

@Module({
  controllers: [PositionController],
  providers: [
    PositionService,
    PgPoolService]
})
export class PositionModule {}
