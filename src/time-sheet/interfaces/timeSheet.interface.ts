export interface ITimeSheetEmployeeRowData {
  pk: number
  base_pk: number
  time_sheet_pk: number
  employee_pk: string
  date: string
  type_of_time_pk: string
  type_of_time_code: string
  type_of_time_name: string
  hour: number
}

export interface ITimeSheetEmployeeDateData {
  date: string
  description: string
  data: ITimeSheetEmployeeRowData[]
}

export interface ITimeSheetEmployeeData {
  pk: number
  base_pk: number
  time_sheet_pk: number
  employee_pk: string
  data1: ITimeSheetEmployeeData[]
  data2: ITimeSheetEmployeeData[]
  data3: ITimeSheetEmployeeData[]
  data4: ITimeSheetEmployeeData[]
  data5: ITimeSheetEmployeeData[]
  data6: ITimeSheetEmployeeData[]
  data7: ITimeSheetEmployeeData[]
  data8: ITimeSheetEmployeeData[]
  data9: ITimeSheetEmployeeData[]
  data10: ITimeSheetEmployeeData[]
  data11: ITimeSheetEmployeeData[]
  data12: ITimeSheetEmployeeData[]
  data13: ITimeSheetEmployeeData[]
  data14: ITimeSheetEmployeeData[]
  data15: ITimeSheetEmployeeData[]
  data16: ITimeSheetEmployeeData[]
  data17: ITimeSheetEmployeeData[]
  data18: ITimeSheetEmployeeData[]
  data19: ITimeSheetEmployeeData[]
  data20: ITimeSheetEmployeeData[]
  data21: ITimeSheetEmployeeData[]
  data22: ITimeSheetEmployeeData[]
  data23: ITimeSheetEmployeeData[]
  data24: ITimeSheetEmployeeData[]
  data25: ITimeSheetEmployeeData[]
  data26: ITimeSheetEmployeeData[]
  data27: ITimeSheetEmployeeData[]
  data28: ITimeSheetEmployeeData[]
  data29: ITimeSheetEmployeeData[]
  data30: ITimeSheetEmployeeData[]
  data31: ITimeSheetEmployeeData[]
}


export interface ITimeSheet {
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
  employeeData: ITimeSheetEmployeeData[]
}