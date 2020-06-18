import { IsEmail, IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrganizationDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly pk: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}