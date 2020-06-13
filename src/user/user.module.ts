import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';

@Module({
  providers: [
    UserService,
    PgPoolService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
