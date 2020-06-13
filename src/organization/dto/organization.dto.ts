import { IsEmail, IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrganizationDto{
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
    readonly name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly code: string;
}