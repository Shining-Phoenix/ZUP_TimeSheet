import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ITimeSheet } from '../../../../src/time-sheet/interfaces/timeSheet.interface';

@Injectable({providedIn: 'root'})
export class TimeSheetService {

  constructor(private http: HttpClient) {}

  getTimeSheetListForKeeper(): Observable<ITimeSheet[]> {
    return this.http.get(environment.backUrl + environment.backTimeSheetListForKeeper)
      .pipe(map((timeSheetListList: ITimeSheet[]) => {
        return timeSheetListList
      }))
  }

  getTimeSheetListById(timeSheetPk: string): Observable<ITimeSheet> {
    return this.http.get(environment.backUrl + environment.backTimeSheetById,{params: {timeSheetPk }} )
      .pipe(map((timeSheet: ITimeSheet) => {
        return timeSheet
      }))
  }
}
