import {IsDate, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';
import {Type} from "class-transformer";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, {
        message: 'name is too short',
    })
    @MaxLength(20, {
        message: 'name is too long',
    })
    name: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    dob: Date;

    @IsString()
    @IsNotEmpty()
    @MinLength(5, {
        message: 'address is too short',
    })
    @MaxLength(120, {
        message: 'address is too long',
    })
    address: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5, {
        message: 'description is too short',
    })
    @MaxLength(120, {
        message: 'description is too long',
    })
    description: string;
}