import { IsEmail, IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly pk: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly base_pk: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly user_id_1c: string;

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
    readonly head_employee_pk: string;
}