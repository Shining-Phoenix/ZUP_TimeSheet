export interface TimeSheetInterface {
  pk: number
  userPk: number
  basePk: number
  organizationPk: string
  subdivisionPk: string
  date: string
  period: string
  deleted: boolean
  organizationName: string
  subdivisionName: string
  statusPk: number
  statusName: string,
  confirmedBy1c: boolean,
  confirmedByTimekeeper: boolean
}