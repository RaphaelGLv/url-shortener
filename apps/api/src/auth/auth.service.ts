import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterUserRequestDto } from './dtos/register/register-user.request.dto';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dtos/login/login.request.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ) {}

    async generateToken(user: UserDocument): Promise<string> {
        const accessToken = await this.jwtService.signAsync({ sub: user._id, email: user.email, });
        return accessToken;
    }

    async register(user: UserEntity) {
        const existingUser = await this.authRepository.findByEmail(user.email);
        if (existingUser) {
            throw new ConflictException('This email has already been used');
        }

        const newUser = await this.authRepository.createUser(user);

        return this.generateToken(newUser);
    }

    async login(user: UserEntity) {
        const existingUser = await this.authRepository.findByEmail(user.email);

        if (!existingUser) {
            // Return both as invalid to avoid user enumeration
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(user.password, existingUser.password);
        if (!isPasswordValid) {
            // Return both as invalid to avoid user enumeration
            throw new UnauthorizedException('Invalid email or password');
        }

        return this.generateToken(existingUser);
    }
}
