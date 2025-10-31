import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { RegisterUserResponseDto } from './dtos/register/register-user.response.dto';
import type { LoginResponseDto } from './dtos/login/login.response.dto';
import { Public } from 'src/decorators/public.decorator';
import { RegisterUserRequestDto } from './dtos/register/register-user.request.dto';
import { LoginRequestDto } from './dtos/login/login.request.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Throttle({ default: { ttl: 60_000, limit: 5, blockDuration: 300_000 } })
    @Public()
    @Post('register')
    async register(@Body() registerUserRequestDto: RegisterUserRequestDto): Promise<RegisterUserResponseDto> {
        const token = await this.authService.register({
            email: registerUserRequestDto.email,
            password: registerUserRequestDto.password,
        });

        return { token };
    }
    
    @Throttle({ default: { ttl: 60_000, limit: 5, blockDuration: 300_000 } })
    @Public()
    @HttpCode(200)
    @Post('login')
    async login(@Body() loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
        const token = await this.authService.login({
            email: loginRequestDto.email,
            password: loginRequestDto.password,
        });

        return { token };
    }
}
