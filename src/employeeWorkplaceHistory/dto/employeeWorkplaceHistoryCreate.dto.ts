import { IsString, IsNotEmpty, IsNumber, IsArray, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EmployeeWorkplaceHistoryCreateRowDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly position_pk: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly subdivision_pk: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly date_from: string;
}

export class EmployeeWorkplaceHistoryCreateDto{

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly employee_pk: string;

  @ApiProperty({
    type: [EmployeeWorkplaceHistoryCreateRowDto],
  })
  @IsArray()
  @IsNotEmpty()
  @Type(() => EmployeeWorkplaceHistoryCreateRowDto)
  readonly workplaces: EmployeeWorkplaceHistoryCreateRowDto[];
}