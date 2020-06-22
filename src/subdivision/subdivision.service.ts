import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { ISubdivision } from './interfaces/subdivision.interface';
import { SubdivisionDto } from './dto/subdivision.dto';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';
import { IUser } from '../user/interfaces/user.interface';
import { ITokenPayload } from '../auth/interfaces/token-payload.interface';
import { IOrganization } from '../organization/interfaces/organization.interface';


@Injectable()
export class SubdivisionService {
  constructor(private readonly pgPoolService: PgPoolService) {}

  async create(user: ITokenPayload, subdivisionDto: SubdivisionDto): Promise<ISubdivision> {
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
          user.base_pk,
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

  async update(user: ITokenPayload, subdivisionDto: SubdivisionDto): Promise<Boolean> {
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
  
  async getByOrganization(user: ITokenPayload, organizationPk: string): Promise<ISubdivision[]> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const subdivisionList = <ISubdivision[]>[];

      const selectSQL = `
      SELECT
          "name", pk, code, organization_pk, parent_pk
      FROM public.subdivision
      WHERE 
          base_pk = $1
          AND organization_pk = $2
      ORDER BY
          "name"    
      `;
      const result = await client.query(selectSQL,
        [
          user.base_pk,
          organizationPk]);

      for (const subdivision of result) {
        const newSubdivision: ISubdivision = {
          code: subdivision.get('code').toString(),
          organization_pk: subdivision.get('organization_pk').toString(),
          parent_pk: subdivision.get('parent_pk').toString(),
          pk: subdivision.get('pk').toString(),
          name: subdivision.get('name').toString(),
        };

        subdivisionList.push(newSubdivision);
      }

      return subdivisionList;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }

}
