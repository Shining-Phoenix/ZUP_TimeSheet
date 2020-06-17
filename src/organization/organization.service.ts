import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { IOrganization } from './interfaces/organization.interface';
import { OrganizationDto } from './dto/organization.dto';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';
import { ITokenPayload } from '../auth/interfaces/token-payload.interface';


@Injectable()
export class OrganizationService {
  constructor(private readonly pgPoolService: PgPoolService) {}

  async create(user: ITokenPayload, organizationDto: OrganizationDto): Promise<IOrganization> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          INSERT INTO public.organization
              (pk, base_pk, name, code)
          VALUES
              ($1, $2, $3, $4)
          RETURNING pk`;
      const result = await client.query(insertSQL,
        [organizationDto.pk,
          user.base_pk,
          organizationDto.name,
          organizationDto.code],
      );
      const rows = [...result];

      const pk = rows[0].get('pk');

      await client.query('commit');

      const createdOrganization = _.assignIn(organizationDto, {pk});

      return createdOrganization;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }

  async update(user: ITokenPayload, organizationDto: OrganizationDto): Promise<Boolean> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          UPDATE
              public.organization
          SET
              name = $1,
              code = $2
          WHERE
              pk = $3
              and base_pk = $4`;
      await client.query(insertSQL,
        [organizationDto.name,
          organizationDto.code,
          organizationDto.pk,
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
