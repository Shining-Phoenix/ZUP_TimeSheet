import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { IEmployee } from './interfaces/employee.interface';
import { EmployeeDto } from './dto/employee.dto';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';


@Injectable()
export class EmployeeService {
  constructor(private readonly pgPoolService: PgPoolService) {}

  async create( employeeDto: EmployeeDto): Promise<IEmployee> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          INSERT INTO public.employee
              (pk, base_pk, user_id_1c, code, organization_pk, head_employee_pk)
          VALUES
              ($1, $2, $3, $4, $5, $6)
          RETURNING pk`;
      const result = await client.query(insertSQL,
        [employeeDto.pk,
          employeeDto.base_pk,
          employeeDto.user_id_1c,
          employeeDto.code,
          employeeDto.organization_pk,
          employeeDto.head_employee_pk],
      );
      const rows = [...result];

      const pk = rows[0].get('pk');

      await client.query('commit');

      const createdEmployee = _.assignIn(employeeDto, {pk});

      return createdEmployee;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }

  async update( employeeDto: EmployeeDto): Promise<Boolean> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          UPDATE
              public.employee
          SET
              user_id_1c = $1,
              code = $2,
              organization_pk = $3,
              head_employee_pk = $4
          WHERE
              pk = $5
              and base_pk = $6`;
      await client.query(insertSQL,
        [employeeDto.user_id_1c,
          employeeDto.code,
          employeeDto.organization_pk,
          employeeDto.head_employee_pk,
          employeeDto.pk,
          employeeDto.base_pk],
      );

      await client.query('commit');

      return true;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }
}
