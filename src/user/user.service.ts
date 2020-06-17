import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';
import { statusEnum } from './enums/status.enum';
import { roleEnum } from './enums/role.enum';

@Injectable()
export class UserService {

  constructor(private readonly pgPoolService: PgPoolService) {}

  async create(createUserDto: CreateUserDto, roles: Array<number>): Promise<IUser> {

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          INSERT INTO public.users
              (firstname, lastname, patronymic, id_1c, email, password, base_pk, status)
          VALUES
              ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING pk`;
      const result = await client.query(insertSQL,
        [createUserDto.firstName,
          createUserDto.lastName,
          createUserDto.patronymic,
          createUserDto.id_1c,
          createUserDto.email,
          hash,
          createUserDto.base_pk,
          statusEnum.active],
      );
      const rows = [...result];

      const pk = +rows[0].get('pk');

      const roleSQL = `
          INSERT INTO public.user_groups
              (group_pk, user_pk)
          VALUES
              ($1, $2)`;

      for (const role of roles) {
        client.query(roleSQL, [ roleEnum[role], pk]);
      }

      await client.query('commit');

      const createdUser = _.assignIn(createUserDto, { password: hash, pk, roles, status: statusEnum.active });

      return createdUser;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }

  }

  async find(id: number): Promise<IUser> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const selectSQL = `
          SELECT 
              pk, firstname, lastname, patronymic, id_1c, email, password, base_pk, status
          FROM
              public.users
          WHERE
              pk = $1`;
      const result = await client.query(selectSQL,
        [id],
      );
      const rows = [...result];
      const userRow = rows[0];

      const roleSQL = `
          SELECT FROM public.user_groups
              group_pk
          WHERE
              user_pk = $1`;
      const roleResult = await client.query(roleSQL, [id]);

      const roles = [];

      for (const role of roleResult) {
        roles.push(roleEnum[+role.get('group_pk').toString()]);
      }

      await client.query('commit');

      const user = {
        pk: +userRow.get('pk').toString(),
        firstName: userRow.get('firstName').toString(),
        lastName: userRow.get('lastName').toString(),
        patronymic: userRow.get('patronymic').toString(),
        id_1c: userRow.get('id_1c').toString(),
        email: userRow.get('email').toString(),
        password: userRow.get('password').toString(),
        base_pk: +userRow.get('base_pk').toString(),
        status: +userRow.get('status').toString,
        roles,
      };

      return user;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }

  async findByEmail(email: string): Promise<IUser> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const selectSQL = `
          SELECT 
              pk, firstname, lastname, patronymic, id_1c, email, password, base_pk, status
          FROM
              public.users
          WHERE
              email = $1`;
      const result = await client.query(selectSQL, [email]);
      const rows = [...result];

      let user: IUser;

      if (rows.length) {
        const userRow = rows[0];

        const roleSQL = `
          SELECT 
              group_pk
          FROM 
              public.user_groups
          WHERE
              user_pk = $1`;
        const roleResult = await client.query(roleSQL, [+userRow.get('pk').toString()]);

        const roles = [];

        for (const role of roleResult) {
          roles.push(roleEnum[+role.get('group_pk').toString()]);
        }

        await client.query('commit');

        user = {
          pk: +userRow.get('pk').toString(),
          firstName: userRow.get('firstname').toString(),
          lastName: userRow.get('lastname').toString(),
          patronymic: userRow.get('patronymic').toString(),
          id_1c: userRow.get('id_1c').toString(),
          email: userRow.get('email').toString(),
          password: userRow.get('password').toString(),
          base_pk: +userRow.get('base_pk').toString(),
          status: +userRow.get('status').toLocaleString(),
          roles,
        };
      } else {
        user = {
          pk: -1,
          firstName: '',
          lastName: '',
          patronymic: '',
          id_1c: '',
          email: '',
          password: '',
          base_pk: 0,
          status: 0,
          roles: [],
        };
      }
      return user;
    } catch (e) {
      console.log(e)
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }
}
