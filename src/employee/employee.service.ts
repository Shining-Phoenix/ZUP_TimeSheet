import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { IEmployee } from './interfaces/employee.interface';
import { EmployeeDto } from './dto/employee.dto';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';
import { ITokenPayload } from '../auth/interfaces/token-payload.interface';
import { EmployeeListDto } from './dto/employeeList.dto';
import { roleEnum } from '../user/enums/role.enum';
import { IEmployeeList } from './interfaces/employeeList.dto';


@Injectable()
export class EmployeeService {
  constructor(private readonly pgPoolService: PgPoolService) {}

  async create(user: ITokenPayload, employeeDto: EmployeeDto): Promise<IEmployee> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
          INSERT INTO public.employee
              (pk, base_pk, user_id_1c, code, organization_pk, head_employee_pk, name)
          VALUES
              ($1, $2, $3, $4, $5, $6, $7)
          RETURNING pk`;
      const result = await client.query(insertSQL,
        [employeeDto.pk,
          user.base_pk,
          employeeDto.user_id_1c,
          employeeDto.code,
          employeeDto.organization_pk,
          employeeDto.head_employee_pk,
          employeeDto.name],
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

  async update(user: ITokenPayload, employeeDto: EmployeeDto): Promise<Boolean> {
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
              name = $5
          WHERE
              pk = $6
              and base_pk = $7`;
      await client.query(insertSQL,
        [employeeDto.user_id_1c,
          employeeDto.code,
          employeeDto.organization_pk,
          employeeDto.head_employee_pk,
          employeeDto.name,
          employeeDto.pk,
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

  async getEmployeeListForKeeper(user: ITokenPayload): Promise<IEmployeeList[]> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
                        SELECT 
                            employee.pk,
                            employee.name,
                            employee.code,
                            organization.pk as organization_pk,
                            organization.name as organization_name,
                            subdivision.name as subdivision_name,
                            employee_workplace_history.subdivision_pk as subdivision_pk,
                            employee_position.name as position_name,
                            employee_workplace_history.position_pk as position_pk
                        FROM 
                             employee as employee   
                              left join employee_workplace_history as employee_workplace_history 
                                inner join 
                                        (SELECT 
                                            employee_workplace_history.employee_pk as employee_pk,
                                            max(employee_workplace_history.date_from) as date_from 
                                         FROM 
                                              employee_workplace_history
                                        WHERE 
                                         employee_workplace_history.base_pk = $1
                                         and employee_workplace_history.date_from <= $2  
                                         GROUP BY
                                            employee_workplace_history.employee_pk) as vt_workplace_slice 
                                         on (employee_workplace_history.employee_pk = vt_workplace_slice.employee_pk
                                              and employee_workplace_history.date_from = vt_workplace_slice.date_from)                          
                              
                                 on (employee.pk = employee_workplace_history.employee_pk 
                                 and employee.base_pk = employee_workplace_history.base_pk)
                              
                              left join subdivision as subdivision 
                                   on (employee_workplace_history.subdivision_pk = subdivision.pk
                                       and employee_workplace_history.base_pk = subdivision.base_pk)
                              
                              left join "position" as employee_position 
                                   on (employee_workplace_history.position_pk = employee_position.pk
                                      and employee_workplace_history.base_pk = employee_position.base_pk)
                              
                              left join organization as organization 
                                   on (employee.organization_pk = organization.pk
                                      and employee.base_pk = organization.base_pk)                             
                        WHERE
                            employee.base_pk = $3
                        ORDER BY
                            employee.name            
                        `;
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      const result = await client.query(insertSQL,
        [user.base_pk,
          today,
          user.base_pk],
      );

      const employeeList: EmployeeListDto[] = [];

      for (const employee of result) {
           const employeeData: IEmployeeList = {
           pk : employee.get('pk').toString(),
           name : employee.get('name').toString(),
           code : employee.get('code').toString(),
           organization_pk : employee.get('organization_pk').toString(),
           organization_name : employee.get('organization_name').toString(),
           subdivision_pk : employee.get('subdivision_pk').toString(),
           subdivision_name : employee.get('subdivision_name').toString(),
           position_pk : employee.get('pk').toString(),
           position_name : employee.get('position_name').toString()}

           employeeList.push(employeeData)
      }

      await client.query('commit');

      return employeeList;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }
  
  async getEmployeeById(user: ITokenPayload, pk: string): Promise<IEmployeeList> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
                        SELECT 
                            employee.pk,
                            employee.name,
                            employee.code,
                            organization.pk as organization_pk,
                            organization.name as organization_name,
                            subdivision.name as subdivision_name,
                            employee_workplace_history.subdivision_pk as subdivision_pk,
                            employee_position.name as position_name,
                            employee_workplace_history.position_pk as position_pk
                        FROM 
                             employee as employee   
                              left join employee_workplace_history as employee_workplace_history 
                                inner join 
                                        (SELECT 
                                            employee_workplace_history.employee_pk as employee_pk,
                                            max(employee_workplace_history.date_from) as date_from 
                                         FROM 
                                              employee_workplace_history
                                        WHERE 
                                           employee_workplace_history.base_pk = $1
                                           and employee_workplace_history.date_from <= $2 
                                           and employee_workplace_history.employee_pk = $3 
                                         GROUP BY
                                            employee_workplace_history.employee_pk) as vt_workplace_slice 
                                         on (employee_workplace_history.employee_pk = vt_workplace_slice.employee_pk
                                              and employee_workplace_history.date_from = vt_workplace_slice.date_from)                          
                              
                                 on (employee.pk = employee_workplace_history.employee_pk 
                                 and employee.base_pk = employee_workplace_history.base_pk)
                              
                              left join subdivision as subdivision 
                                   on (employee_workplace_history.subdivision_pk = subdivision.pk
                                       and employee_workplace_history.base_pk = subdivision.base_pk)
                              
                              left join "position" as employee_position 
                                   on (employee_workplace_history.position_pk = employee_position.pk
                                      and employee_workplace_history.base_pk = employee_position.base_pk)
                              
                              left join organization as organization 
                                   on (employee.organization_pk = organization.pk
                                      and employee.base_pk = organization.base_pk)                             
                        WHERE
                            employee.base_pk = $4
                            and employee.pk = $5
                        ORDER BY
                            employee.name            
                        `;
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      const result = await client.query(insertSQL,
        [user.base_pk,
          today,
          pk,
          user.base_pk,
          pk],
      );

      const row = [...result]

      const employee: IEmployeeList = {
          pk : row[0].get('pk').toString(),
          name : row[0].get('name').toString(),
          code : row[0].get('code').toString(),
          organization_pk : row[0].get('organization_pk').toString(),
          organization_name : row[0].get('organization_name').toString(),
          subdivision_pk : row[0].get('subdivision_pk').toString(),
          subdivision_name : row[0].get('subdivision_name').toString(),
          position_pk : row[0].get('pk').toString(),
          position_name : row[0].get('position_name').toString()}


      await client.query('commit');

      return employee;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }

  
}
