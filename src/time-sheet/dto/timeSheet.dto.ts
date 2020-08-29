import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ITimeSheetEmployeeData } from '../interfaces/timeSheet.interface';
import { Type } from 'class-transformer';
import { EmployeeWorkplaceHistoryCreateRowDto } from '../../employeeWorkplaceHistory/dto/employeeWorkplaceHistoryCreate.dto';

export interface TimeSheetEmployeeRowDataDto {
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

export interface TimeSheetEmployeeDateDataDto {
  date: string
  description: string
  data: TimeSheetEmployeeRowDataDto[]
}

export class TimeSheetEmployeeDataDto {
  pk: number
  base_pk: number
  time_sheet_pk: number
  employee_pk: string
  data1: TimeSheetEmployeeDataDto[]
  data2:   TimeSheetEmployeeDataDto[]
  data3:   TimeSheetEmployeeDataDto[]
  data4:   TimeSheetEmployeeDataDto[]
  data5:   TimeSheetEmployeeDataDto[]
  data6:   TimeSheetEmployeeDataDto[]
  data7:   TimeSheetEmployeeDataDto[]
  data8:   TimeSheetEmployeeDataDto[]
  data9:   TimeSheetEmployeeDataDto[]
  data10:   TimeSheetEmployeeDataDto[]
  data11:   TimeSheetEmployeeDataDto[]
  data12:   TimeSheetEmployeeDataDto[]
  data13:   TimeSheetEmployeeDataDto[]
  data14:   TimeSheetEmployeeDataDto[]
  data15:   TimeSheetEmployeeDataDto[]
  data16:   TimeSheetEmployeeDataDto[]
  data17:   TimeSheetEmployeeDataDto[]
  data18:   TimeSheetEmployeeDataDto[]
  data19:   TimeSheetEmployeeDataDto[]
  data20:   TimeSheetEmployeeDataDto[]
  data21:   TimeSheetEmployeeDataDto[]
  data22:   TimeSheetEmployeeDataDto[]
  data23:   TimeSheetEmployeeDataDto[]
  data24:   TimeSheetEmployeeDataDto[]
  data25:   TimeSheetEmployeeDataDto[]
  data26:   TimeSheetEmployeeDataDto[]
  data27:   TimeSheetEmployeeDataDto[]
  data28:   TimeSheetEmployeeDataDto[]
  data29:   TimeSheetEmployeeDataDto[]
  data30:   TimeSheetEmployeeDataDto[]
  data31:   TimeSheetEmployeeDataDto[]
}

export class TimeSheetDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly pk: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly userPk: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly basePk: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly organizationPk: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly subdivisionPk: string

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly date: string

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly period: string

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly deleted: boolean

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly organizationName: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly subdivisionName: string

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly confirmedByTimekeeper: boolean

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly confirmedBy1c: boolean

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly statusPk: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly statusName: string

  @ApiProperty({
    type: [TimeSheetEmployeeDataDto],
  })
  @IsArray()
  @IsNotEmpty()
  @Type(() => TimeSheetEmployeeDataDto)
  readonly employeeData: TimeSheetEmployeeDataDto[];
}