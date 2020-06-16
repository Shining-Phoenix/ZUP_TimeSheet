import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { IWorkSchedules } from './interfaces/workSchedules.interface';
import { WorkSchedulesDto } from './dto/workSchedules.dto';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';


@Injectable()
export class WorkSchedulesService {
  constructor(private readonly pgPoolService: PgPoolService) {}

  async create( workSchedulesDto: WorkSchedulesDto): Promise<IWorkSchedules> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          INSERT INTO public.work_schedules
              (pk, base_pk, "name", deleted)
          VALUES
              ($1, $2, $3, $4)
          RETURNING pk`;
      const result = await client.query(insertSQL,
        [workSchedulesDto.pk,
          workSchedulesDto.base_pk,
          workSchedulesDto.name,
          workSchedulesDto.deleted],
      );
      const rows = [...result];

      const pk = rows[0].get('pk');

      await client.query('commit');

      const createdWorkSchedules = _.assignIn(workSchedulesDto, {pk});

      return createdWorkSchedules;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }

  async update( workSchedulesDto: WorkSchedulesDto): Promise<Boolean> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          UPDATE
              public.work_schedules
          SET
              "name" = $1,
              deleted = $2
          WHERE
              pk = $3
              and base_pk = $4`;
      await client.query(insertSQL,
        [workSchedulesDto.name,
          workSchedulesDto.deleted,
          workSchedulesDto.pk,
          workSchedulesDto.base_pk],
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
