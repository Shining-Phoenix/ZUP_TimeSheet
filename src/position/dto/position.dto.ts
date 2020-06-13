import { IsEmail, IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PositionDto{
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
}