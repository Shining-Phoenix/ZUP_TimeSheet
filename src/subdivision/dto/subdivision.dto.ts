import { IsEmail, IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubdivisionDto{
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
    readonly parent_pk: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly organization_pk: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    readonly hasChild: boolean;
}