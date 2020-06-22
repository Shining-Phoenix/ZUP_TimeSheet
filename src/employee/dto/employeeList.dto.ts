import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeListDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly pk: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly organization_pk: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly organization_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly subdivision_pk: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly subdivision_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly position_pk: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly position_name: string;
}