export interface IEmployeeList{
  readonly pk: string;
  readonly name: string;
  readonly code: string;
  readonly organization_pk: string;
  readonly organization_name: string;
  readonly subdivision_pk: string;
  readonly subdivision_name: string;
  readonly position_pk: string;
  readonly position_name: string;
}