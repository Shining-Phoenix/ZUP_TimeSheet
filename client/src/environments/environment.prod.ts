import {Environment} from './interface';

export const environment: Environment = {
  production: true,
  backUrl: 'http://localhost:3000',
  backSignIn: '/auth/signIn',
  backEmployeeListForKeeper: '/api/v1/employee/employee-list-for-keeper',
  backEmployeeListById: '/api/v1/employee/employee-list-by-id',
  backTimeSheetListForKeeper: '/api/v1/time-sheet/time-sheet-list-for-keeper',
  backTimeSheetById: '/api/v1/time-sheet/time-sheet-list-by-id',
  backOrganization: '/api/v1/organization',
  backSubdivisionByOrganization: '/api/v1/subdivision/by-organization'
};
