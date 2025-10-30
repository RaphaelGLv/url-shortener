import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class RegisterUserRequestDto {
    @IsNotEmpty({message: 'Email should not be empty'})
    @IsEmail({}, {message: 'Invalid email format'})
    email: string;

    @IsNotEmpty({message: 'Password should not be empty'})
    @IsString({message: 'Password must be a string'})
    @MaxLength(72, {message: 'Password must be at most 72 characters long'})
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {message: 'Password is not strong enough'})
    password: string;
}