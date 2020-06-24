import { Injectable } from '@nestjs/common';

import { ITokenPayload } from '../auth/interfaces/token-payload.interface';
import {
  ITimeSheet,
  ITimeSheetEmployeeData,
  ITimeSheetEmployeeDateData,
  ITimeSheetEmployeeRowData,
} from './interfaces/timeSheet.interface';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';

@Injectable()
export class TimeSheetService {
  constructor(private readonly pgPoolService: PgPoolService) {}

  async getTimeSheetListForKeeper(user: ITokenPayload): Promise<ITimeSheet[]> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const selectSQL = `
      SELECT
        time_sheet.pk, 
        time_sheet.user_pk, 
        time_sheet.base_pk, 
        time_sheet.organization_pk, 
        time_sheet.subdivision_pk, 
        time_sheet."date", 
        time_sheet.period, 
        time_sheet.deleted,
        time_sheet.status_pk,
        time_sheet.confirmed_by_1c,
        time_sheet.confirmed_by_timekeeper,
        CASE WHEN time_sheet_status.name IS NULL 
            THEN ' ' 
            ELSE time_sheet_status.name  
        END as status_name,
        CASE WHEN organization.name  IS NULL 
            THEN ' ' 
            ELSE organization.name  
        END as organization_name,
        CASE WHEN subdivision.name  IS NULL 
            THEN ' ' 
            ELSE subdivision.name  
        END as subdivision_name        
      FROM public.time_sheet
           left join organization on
                (time_sheet.base_pk = organization.base_pk
                and time_sheet.organization_pk = organization.pk)
           left join subdivision on
                (time_sheet.base_pk = subdivision.base_pk
                and time_sheet.subdivision_pk = subdivision.pk)  
           left join time_sheet_status on
                (time_sheet.base_pk = time_sheet_status.base_pk
                and time_sheet.status_pk = time_sheet_status.pk)      
      WHERE
        time_sheet.base_pk = $1 
        AND time_sheet.user_pk = $2`;

      const result = await client.query(selectSQL,
        [user.base_pk,
          user.pk],
      );

      const timeSheetList: ITimeSheet[] = [];

      for (const timeSheet of result) {
        const timeSheetData: ITimeSheet = {
          pk : +timeSheet.get('pk').toString(),
          userPk : +timeSheet.get('user_pk').toString(),
          basePk : +timeSheet.get('base_pk').toString(),
          organizationPk : timeSheet.get('organization_pk').toString(),
          organizationName : timeSheet.get('organization_name').toString(),
          subdivisionPk : timeSheet.get('subdivision_pk').toString(),
          subdivisionName : timeSheet.get('subdivision_name').toString(),
          date : timeSheet.get('date').toString(),
          period : timeSheet.get('period').toString(),
          deleted: timeSheet.get('deleted').toString() === 'true',
          statusPk: +timeSheet.get('status_pk').toString(),
          statusName: timeSheet.get('status_name').toString(),
          confirmedByTimekeeper: timeSheet.get('confirmed_by_timekeeper').toString() === 'true',
          confirmedBy1c: timeSheet.get('confirmed_by_1c').toString() === 'true',
          employeeData: []
        }

        timeSheetList.push(timeSheetData)
      }


      await client.query('commit');

      return timeSheetList;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }

  async getTimeSheetListById(user: ITokenPayload, pk: number): Promise<ITimeSheet> {
    const client = await this.pgPoolService.client();

    //try {
      await client.query('begin');

      const timeSheetEmployeeRowDataList: ITimeSheetEmployeeRowData[] = []

      const selectDate = `
      SELECT 
          public.time_sheet_employee_data.pk,
          public.time_sheet_employee_data.employee_pk,
          public.time_sheet_employee_data.time_sheet_pk,
          public.time_sheet_employee_data.date,
          public.time_sheet_employee_data.type_of_time_pk,
          public.time_sheet_employee_data.base_pk,
          public.time_sheet_employee_data.hour,
          CASE WHEN public.types_of_time.time_code IS NULL 
            THEN ' ' 
            ELSE public.types_of_time.time_code  
          END as types_of_time_code,
          CASE WHEN public.types_of_time.name IS NULL 
            THEN ' ' 
            ELSE public.types_of_time.name  
          END as types_of_time_name
      FROM
          public.time_sheet
          INNER JOIN public.time_sheet_employee_data 
              ON (public.time_sheet.pk = public.time_sheet_employee_data.time_sheet_pk)
                  AND (public.time_sheet.base_pk = public.time_sheet_employee_data.base_pk)
          left JOIN public.types_of_time 
              ON (public.time_sheet_employee_data.type_of_time_pk = public.types_of_time.pk)
              AND (public.time_sheet_employee_data.base_pk = public.types_of_time.base_pk)
      WHERE
          time_sheet.base_pk = $1 
          AND time_sheet.user_pk = $2
          AND time_sheet.pk = $3
      ORDER BY
          public.time_sheet_employee_data.time_sheet_pk,
          public.time_sheet_employee_data.employee_pk,
          public.time_sheet_employee_data.date       
      `
      const resultData = await client.query(selectDate,
        [user.base_pk,
          user.pk,
          pk],
      );

      for (const timeSheet of resultData) {
        const timeSheetData: ITimeSheetEmployeeRowData = {
          pk : +timeSheet.get('pk').toString(),
          base_pk : +timeSheet.get('base_pk').toString(),
          time_sheet_pk : +timeSheet.get('time_sheet_pk').toString(),
          employee_pk : timeSheet.get('employee_pk').toString(),
          date : timeSheet.get('date').toString(),
          type_of_time_pk : timeSheet.get('type_of_time_pk').toString(),
          type_of_time_code : timeSheet.get('type_of_time_code').toString(),
          type_of_time_name : timeSheet.get('type_of_time_name').toString(),
          hour : +timeSheet.get('hour').toString()
        }
        timeSheetEmployeeRowDataList.push(timeSheetData)
      }

      const selectSQL = `
      SELECT
        time_sheet.pk, 
        time_sheet.user_pk, 
        time_sheet.base_pk, 
        time_sheet.organization_pk, 
        time_sheet.subdivision_pk, 
        time_sheet."date", 
        time_sheet.period, 
        time_sheet.deleted,
        time_sheet.status_pk,
        time_sheet.confirmed_by_1c,
        time_sheet.confirmed_by_timekeeper,
        CASE WHEN time_sheet_status.name  IS NULL 
            THEN ' ' 
            ELSE time_sheet_status.name  
        END as status_name,
        CASE WHEN organization.name  IS NULL 
            THEN ' ' 
            ELSE organization.name  
        END as organization_name,
        CASE WHEN subdivision.name  IS NULL 
            THEN ' ' 
            ELSE subdivision.name  
        END as subdivision_name 
        
      FROM public.time_sheet
           left join organization on
                (time_sheet.base_pk = organization.base_pk
                and time_sheet.organization_pk = organization.pk)
           left join subdivision on
                (time_sheet.base_pk = subdivision.base_pk
                and time_sheet.subdivision_pk = subdivision.pk)  
           left join time_sheet_status on
                (time_sheet.base_pk = time_sheet_status.base_pk
                and time_sheet.status_pk = time_sheet_status.pk)      
      WHERE
        time_sheet.pk = $1 
        AND time_sheet.base_pk = $2
        AND time_sheet.user_pk = $3
        `;
      const result = await client.query(selectSQL,
        [
          pk,
          user.base_pk,
          user.pk],
      );

      let timeSheet : ITimeSheet = <ITimeSheet>{};
      console.log(timeSheet)
      timeSheet.employeeData = []

      if (result.rows.length > 0) {

        let timeSheetEmployeeData = <ITimeSheetEmployeeData>{}

        for (const employeeData of timeSheetEmployeeRowDataList) {
          if (timeSheetEmployeeData.employee_pk != employeeData.employee_pk) {
            if (timeSheetEmployeeData) {
              timeSheet.employeeData.push(timeSheetEmployeeData)
            }
            timeSheetEmployeeData = <ITimeSheetEmployeeData>{}
            timeSheetEmployeeData.employee_pk = employeeData.employee_pk
          }

          for (let i = 1; i < 32; i++) {
            const docPeriod = new Date(result[0].get('period').toString())
            const month = docPeriod.getMonth()
            const year = docPeriod.getFullYear()
            const date = new Date(year, month, i)

            timeSheet.employeeData['data' + i] = []

            const dayDate = timeSheetEmployeeRowDataList.filter(
              el => new Date(el.date) === date && el.employee_pk === employeeData.employee_pk)

            const timeSheetEmployeeDateData: ITimeSheetEmployeeDateData = {
              date: date.toString(),
              description: '',
              data: []
            }

            for (const dayDateRow of dayDate) {


            }
          }
        }

        if (timeSheetEmployeeData) {
          timeSheet.employeeData.push(timeSheetEmployeeData)
        }

        const setOfColumns = Object.entries(result.names)

        for (const timeSheetRow of result) {
          timeSheet = {
            ...timeSheet,
            pk: +timeSheetRow.get('pk').toString(),
            userPk: +timeSheetRow.get('user_pk').toString(),
            basePk: +timeSheetRow.get('base_pk').toString(),
            organizationPk: timeSheetRow.get('organization_pk').toString(),
            organizationName: timeSheetRow.get('organization_name').toString(),
            subdivisionPk: timeSheetRow.get('subdivision_pk').toString(),
            subdivisionName: timeSheetRow.get('subdivision_name').toString(),
            date: timeSheetRow.get('date').toString(),
            period: timeSheetRow.get('period').toString(),
            deleted: timeSheetRow.get('deleted').toString() === 'true',
            statusPk: +timeSheetRow.get('status_pk').toString(),
            statusName: timeSheetRow.get('status_name').toString(),
            confirmedByTimekeeper: timeSheetRow.get('confirmed_by_timekeeper').toString() === 'true',
            confirmedBy1c: timeSheetRow.get('confirmed_by_1c').toString() === 'true'
          }
        }
      }
      await client.query('commit');

      return timeSheet;
    // } catch (e) {
    //   await client.query('roolback');
    //   throw e;
    // } finally {
    //   await this.pgPoolService.pool.release(client);
    // }
  }

  // async create(user: ITokenPayload, timeSheet: ITimeSheet): Promise<boolean>{
  //   const client = await this.pgPoolService.client();
  //
  //   //try {
  //     await client.query('begin');
  //
  //     return true
  //   // } catch (e) {
  //   //   await client.query('roolback');
  //   //   throw e;
  //   // } finally {
  //   // await this.pgPoolService.pool.release(client);
  //   // }
  // }

}
