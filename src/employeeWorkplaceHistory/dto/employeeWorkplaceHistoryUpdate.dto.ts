import { IsEmail, IsString, IsNotEmpty, IsNumber, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeWorkplaceHistoryUpdateDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly position_pk: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly subdivision_pk: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly employee_pk: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    readonly date_from: string;
}