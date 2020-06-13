import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PgPoolService } from './shared/pg-pool/pg-pool.service';
import { configModule } from './configure.root';
import { EmployeeModule } from './employee/employee.module';

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    UserModule,
    AuthModule,
    configModule,
    EmployeeModule
  ],
  providers: [PgPoolService],
})
export class AppModule {}
