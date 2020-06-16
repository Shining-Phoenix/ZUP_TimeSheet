import { IsEmail, IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WorkSchedulesDto{
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
    @IsBoolean()
    @IsNotEmpty()
    readonly deleted: boolean;
}