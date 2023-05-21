import { SignupInput } from './dto/signup-dto';
import { User } from '@Src/database/models/user';
import { Transaction } from 'sequelize';
import { JwtService } from '@nestjs/jwt';
import { RequestService } from '@Shared/request/request.service';
import { SigninDTO } from './dto/signin-dto';
import { UserModel } from './models/user.model';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    private readonly requestService;
    constructor(userModel: User, jwtService: JwtService, requestService: RequestService);
    private refreshTokenCookieOptions;
    signIn(data: SigninDTO, res: any): Promise<UserModel>;
    signUp(signupData: SignupInput): Promise<boolean>;
    generateTokens(userId: number, transaction?: Transaction, rememberMe?: boolean): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateAccessToken(userId: number): Promise<string>;
    generateRefreshToken(userId: number, rememberMe?: boolean): Promise<string>;
}
