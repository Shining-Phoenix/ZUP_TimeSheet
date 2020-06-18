import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { IPosition } from './interfaces/position.interface';
import { PositionDto } from './dto/position.dto';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';
import { ITokenPayload } from '../auth/interfaces/token-payload.interface';


@Injectable()
export class PositionService {
  constructor(private readonly pgPoolService: PgPoolService) {}

  async create(user: ITokenPayload, positionDto: PositionDto): Promise<IPosition> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          INSERT INTO public.position
              (pk, base_pk, name)
          VALUES
              ($1, $2, $3)
          RETURNING pk`;
      const result = await client.query(insertSQL,
        [positionDto.pk,
          user.base_pk,
          positionDto.name]
      );
      const rows = [...result];

      const pk = rows[0].get('pk');

      await client.query('commit');

      const createdPosition = _.assignIn(positionDto, {pk});

      return createdPosition;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }

  async update(user: ITokenPayload, positionDto: PositionDto): Promise<Boolean> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          UPDATE
              public.position
          SET
              name = $1
          WHERE
              pk = $2
              and base_pk = $3`;
      await client.query(insertSQL,
        [positionDto.name,
          positionDto.pk,
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
