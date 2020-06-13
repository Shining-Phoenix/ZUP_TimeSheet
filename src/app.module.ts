import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PgPoolService } from './shared/pg-pool/pg-pool.service';
import { configModule } from './configure.root';
import { EmployeeModule } from './employee/employee.module';
import { OrganizationModule } from './organization/organization.module';

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    configModule,
    UserModule,
    AuthModule,
    EmployeeModule,
    OrganizationModule
  ],
  providers: [PgPoolService],
})
export class AppModule {}
