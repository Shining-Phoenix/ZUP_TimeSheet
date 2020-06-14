import { IsEmail, IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TypesOfTimeDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly pk: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    readonly base_pk: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly code: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    readonly deleted: boolean;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly general_time_pk: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly predefined_name: string;
}