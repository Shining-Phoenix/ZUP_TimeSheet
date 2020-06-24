// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from './interface';

export const environment: Environment = {
  production: false,
  backUrl: 'http://localhost:3000',
  backSignIn: '/api/v1/auth/signIn',
  backEmployeeListForKeeper: '/api/v1/employee/employee-list-for-keeper',
  backEmployeeListById: '/api/v1/employee/employee-list-by-id',
  backTimeSheetListForKeeper: '/api/v1/time-sheet/time-sheet-list-for-keeper',
  backTimeSheetById: '/api/v1/time-sheet/time-sheet-list-by-id',
  backOrganization: '/api/v1/organization',
  backSubdivisionByOrganization: '/api/v1/subdivision/by-organization',
  backSubdivisionByOrganizationAndParent: '/api/v1/subdivision/by-organization-and-parent'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
