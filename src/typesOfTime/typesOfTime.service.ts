import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { ITypesOfTime } from './interfaces/typesOfTime.interface';
import { TypesOfTimeDto } from './dto/typesOfTime.dto';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';
import { ITokenPayload } from '../auth/interfaces/token-payload.interface';


@Injectable()
export class TypesOfTimeService {
  constructor(private readonly pgPoolService: PgPoolService) {}

  async create(user: ITokenPayload, typesOfTimeDto: TypesOfTimeDto): Promise<ITypesOfTime> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          INSERT INTO public.types_of_time
              (pk, base_pk, "name", time_code, deleted, general_time_pk, predefined_name)
          VALUES
              ($1, $2, $3, $4, $5, $6, $7)
          RETURNING pk`;
      const result = await client.query(insertSQL,
        [typesOfTimeDto.pk,
          user.base_pk,
          typesOfTimeDto.name,
          typesOfTimeDto.time_code,
          typesOfTimeDto.deleted,
          typesOfTimeDto.general_time_pk,
          typesOfTimeDto.predefined_name],
      );
      const rows = [...result];

      const pk = rows[0].get('pk');

      await client.query('commit');

      const createdTypesOfTime = _.assignIn(typesOfTimeDto, {pk});

      return createdTypesOfTime;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }

  async update(user: ITokenPayload, typesOfTimeDto: TypesOfTimeDto): Promise<Boolean> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          UPDATE
              public.types_of_time
          SET
              "name" = $1,
              time_code = $2,
              deleted = $3,
              general_time_pk = $4,
              predefined_name = $5
          WHERE
              pk = $6
              and base_pk = $7`;
      await client.query(insertSQL,
        [typesOfTimeDto.name,
          typesOfTimeDto.time_code,
          typesOfTimeDto.deleted,
          typesOfTimeDto.general_time_pk,
          typesOfTimeDto.predefined_name,
          typesOfTimeDto.pk,
          user.base_pk],
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
