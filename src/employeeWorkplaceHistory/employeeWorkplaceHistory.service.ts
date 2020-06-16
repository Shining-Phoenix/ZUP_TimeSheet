import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { EmployeeWorkplaceHistoryUpdateDto } from './dto/employeeWorkplaceHistoryUpdate.dto';
import { EmployeeWorkplaceHistoryDeleteDto} from './dto/employeeWorkplaceHistoryDelete.dto';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';
import { EmployeeWorkplaceHistoryCreateDto, EmployeeWorkplaceHistoryCreateRowDto } from './dto/employeeWorkplaceHistoryCreate.dto';


@Injectable()
export class EmployeeWorkplaceHistoryService {
  constructor(private readonly pgPoolService: PgPoolService) {}

  async create( employeeWorkplaceHistoryDto: EmployeeWorkplaceHistoryCreateDto): Promise<Boolean> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const deleteSQL = `
          DELETE FROM
                public.employee_workplace_history
          WHERE
                employee_pk = $1
                AND base_pk = $2`;
      await client.query(deleteSQL,
        [employeeWorkplaceHistoryDto.employee_pk,
          employeeWorkplaceHistoryDto.base_pk],
      ); 

      let row: EmployeeWorkplaceHistoryCreateRowDto

      for (row of employeeWorkplaceHistoryDto.rows) {
        const insertSQL = `
          INSERT INTO public.employee_workplace_history
              (position_pk, subdivision_pk, employee_pk, date_from, base_pk)
          VALUES
              ($1, $2, $3, $4, $5)`;

        const rowDateFrom = new Date(row.date_from);
        await client.query(insertSQL,
          [row.position_pk,
            row.subdivision_pk,
            employeeWorkplaceHistoryDto.employee_pk,
            rowDateFrom,
            employeeWorkplaceHistoryDto.base_pk]
        );
      }

      await client.query('commit');

      return true;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }

  async update( employeeWorkplaceHistoryDto: EmployeeWorkplaceHistoryUpdateDto): Promise<Boolean> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          UPDATE
              public.employee_workplace_history
          SET
              position_pk = $1,
              subdivision_pk = $2
          WHERE
                employee_pk = $3,
                date_from = $4,
                base_pk = $5 `;
      const rowDateFrom = new Date(employeeWorkplaceHistoryDto.date_from);
      await client.query(insertSQL,
        [employeeWorkplaceHistoryDto.position_pk,
          employeeWorkplaceHistoryDto.subdivision_pk,
          employeeWorkplaceHistoryDto.employee_pk,
          rowDateFrom,
          employeeWorkplaceHistoryDto.base_pk],
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

  async delete( employeeWorkplaceHistoryDeleteDto: EmployeeWorkplaceHistoryDeleteDto): Promise<Boolean> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          DELETE FROM
                public.employee_workplace_history
          WHERE
                employee_pk = $1
                AND date_from = $2
                AND base_pk = $3`;
      const rowDateFrom = new Date(employeeWorkplaceHistoryDeleteDto.date_from);
      await client.query(insertSQL,
        [employeeWorkplaceHistoryDeleteDto.employee_pk,
          rowDateFrom,
          employeeWorkplaceHistoryDeleteDto.base_pk],
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
