import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployeeList } from '../../../../src/employee/interfaces/employeeList.dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) {}

  getEmployeeListForKeeper(): Observable<IEmployeeList[]> {
    return this.http.get(environment.backUrl + environment.backEmployeeListForKeeper)
      .pipe(map((employeeList: IEmployeeList[]) => {
        return employeeList
      }))
  }
  getEmployeeListById(employeePk): Observable<IEmployeeList> {
    return this.http.get(environment.backUrl + environment.backEmployeeListById,{params: {pk : employeePk }} )
      .pipe(map((employeeList: IEmployeeList) => {
        return employeeList
      }))
  }
}
