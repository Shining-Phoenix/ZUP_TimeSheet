import { Module } from '@nestjs/common';

import { configModule } from './configure.root';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PgPoolService } from './shared/pg-pool/pg-pool.service';
import { EmployeeModule } from './employee/employee.module';
import { OrganizationModule } from './organization/organization.module';
import { SubdivisionModule } from './subdivision/subdivision.module';
import { PositionModule } from './position/position.module';
import { TypesOfTimeModule } from './typesOfTime/typesOfTime.module';

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    configModule,
    UserModule,
    AuthModule,
    EmployeeModule,
    OrganizationModule,
    SubdivisionModule,
    PositionModule,
    TypesOfTimeModule
  ],
  providers: [PgPoolService],
})
export class AppModule {}
