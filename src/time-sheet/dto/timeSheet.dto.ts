import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}