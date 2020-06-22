import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { TimeSheetInterface } from '../../../../src/time-sheet/interfaces/timeSheet.interface';

@Injectable({providedIn: 'root'})
export class TimeSheetService {

  constructor(private http: HttpClient) {}

  getTimeSheetListForKeeper(): Observable<TimeSheetInterface[]> {
    return this.http.get(environment.backUrl + environment.backTimeSheetListForKeeper)
      .pipe(map((timeSheetListList: TimeSheetInterface[]) => {
        return timeSheetListList
      }))
  }
  getTimeSheetListById(timeSheetPk: string): Observable<TimeSheetInterface> {
    return this.http.get(environment.backUrl + environment.backEmployeeListById,{params: {timeSheetPk }} )
      .pipe(map((timeSheet: TimeSheetInterface) => {
        return timeSheet
      }))
  }
}
