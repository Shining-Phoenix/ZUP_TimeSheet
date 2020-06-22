import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { IOrganization } from '../../../../src/organization/interfaces/organization.interface';
import { ISubdivision } from '../../../../src/subdivision/interfaces/subdivision.interface';

@Injectable({providedIn: 'root'})
export class CatalogsService {

  constructor(private http: HttpClient) {}

  getOrganizationList(): Observable<IOrganization[]> {
    return this.http.get(environment.backUrl + environment.backOrganization)
      .pipe(map((payload: IOrganization[]) => {
        return payload
      }))
  }

  getSubdivisionByOrganizationList(organizationPk: string): Observable<ISubdivision[]> {
    return this.http.get(environment.backUrl + environment.backSubdivisionByOrganization, {params: { organizationPk }} )
      .pipe(map((payload: ISubdivision[]) => {
        return payload
      }))
  }
}
