import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginRequestDto {
    @IsNotEmpty({message: 'Email should not be empty'})
    @IsEmail({}, {message: 'Invalid email format'})
    email: string;

    @IsNotEmpty({message: 'Password should not be empty'})
    @IsString({message: 'Password must be a string'})    
    password: string;
}