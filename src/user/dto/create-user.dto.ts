import { IsEmail, IsString, IsNotEmpty, Matches, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly patronymic: string;

    readonly roles: number[];

    @IsString()
    @IsNotEmpty()
    @Matches(
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
      { message: 'Weak password' },
    )
    @ApiProperty()
    readonly password: string;

    @ApiProperty()
    readonly id_1c: string;
}