import { Injectable } from '@nestjs/common';

import { ITokenPayload } from '../auth/interfaces/token-payload.interface';
import { TimeSheetInterface } from './interfaces/timeSheet.interface';
import { PgPoolService } from '../shared/pg-pool/pg-pool.service';
import { TimeSheetDto } from './dto/timeSheet.dto';

@Injectable()
export class TimeSheetService {
  constructor(private readonly pgPoolService: PgPoolService) {}

  async getTimeSheetListForKeeper(user: ITokenPayload): Promise<TimeSheetInterface[]> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
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
        time_sheet_status.name as status_name,
        organization.name as organization_name,
        subdivision.name as subdivision_name
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

      const result = await client.query(insertSQL,
        [user.base_pk,
          user.pk],
      );

      const timeSheetList: TimeSheetDto[] = [];

      for (const timeSheet of result) {
        const timeSheetData: TimeSheetDto = {
          pk : +timeSheet.get('pk').toString(),
          userPk : +timeSheet.get('user_pk').toString(),
          basePk : +timeSheet.get('code').toString(),
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
          confirmedBy1c: timeSheet.get('confirmed_by_1c').toString() === 'true'}

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

  async getTimeSheetListById(user: ITokenPayload, pk: number): Promise<TimeSheetInterface> {
    const client = await this.pgPoolService.client();

    try {
      await client.query('begin');

      const insertSQL = `
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
        time_sheet_status.name as status_name,
        organization.name as organization_name,
        subdivision.name as subdivision_name
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
      const result = await client.query(insertSQL,
        [
          pk,
          user.base_pk,
          user.pk],
      );

      const timeSheet = TimeSheetDto;

      if (result.rows.length >0) {
        // timeSheet = {
        //   ...timeSheet,
        //   pk: +timeSheet.get('pk').toString(),
        //   userPk: +timeSheet.get('user_pk').toString(),
        //   basePk: +timeSheet.get('code').toString(),
        //   organizationPk: timeSheet.get('organization_pk').toString(),
        //   organizationName: timeSheet.get('organization_name').toString(),
        //   subdivisionPk: timeSheet.get('subdivision_pk').toString(),
        //   subdivisionName: timeSheet.get('subdivision_name').toString(),
        //   date: timeSheet.get('date').toString(),
        //   period: timeSheet.get('period').toString(),
        //   deleted: timeSheet.get('deleted').toString() === 'true',
        //   statusPk: +timeSheet.get('status_pk').toString(),
        //   statusName: timeSheet.get('status_name').toString(),
        //   confirmedByTimekeeper: timeSheet.get('confirmed_by_timekeeper').toString() === 'true',
        //   confirmedBy1c: timeSheet.get('confirmed_by_1c').toString() === 'true',
        // }
      }


      await client.query('commit');

      return null;
    } catch (e) {
      await client.query('roolback');
      throw e;
    } finally {
      await this.pgPoolService.pool.release(client);
    }
  }

}
