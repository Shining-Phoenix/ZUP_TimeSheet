import { IsEmail, IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeWorkplaceHistoryDeleteDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly employee_pk: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  readonly date_from: string;
}