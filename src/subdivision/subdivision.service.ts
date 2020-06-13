import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { ISubdivision } from './interfaces/subdivision.interface';
import { SubdivisionDto } from './dto/subdivision.dto';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';


@Injectable()
export class SubdivisionService {
  constructor(private readonly pgPoolService: PgPoolService) {}

  async create( subdivisionDto: SubdivisionDto): Promise<ISubdivision> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          INSERT INTO public.subdivision
              (pk, base_pk, name, code, parent_pk, organization_pk)
          VALUES
              ($1, $2, $3, $4, $5, $6)
          RETURNING pk`;
      const result = await client.query(insertSQL,
        [subdivisionDto.pk,
          subdivisionDto.base_pk,
          subdivisionDto.name,
          subdivisionDto.code,
          subdivisionDto.parent_pk,
          subdivisionDto.organization_pk],
      );
      const rows = [...result];

      const pk = rows[0].get('pk');

      await client.query('commit');

      const createdSubdivision = _.assignIn(subdivisionDto, {pk});

      return createdSubdivision;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }

  async update( subdivisionDto: SubdivisionDto): Promise<Boolean> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          UPDATE
              public.subdivision
          SET
              name = $1,
              code = $2,
              parent_pk = $3,
              organization_pk = $4
          WHERE
              pk = $5
              and base_pk = $6`;
      await client.query(insertSQL,
        [subdivisionDto.name,
          subdivisionDto.code,
          subdivisionDto.parent_pk,
          subdivisionDto.organization_pk,
          subdivisionDto.pk,
          subdivisionDto.base_pk],
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
