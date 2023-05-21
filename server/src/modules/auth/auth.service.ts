import { Injectable, NotFoundException } from '@nestjs/common';
import { SignupInput } from './dto/signup-dto';
import { User } from '@Src/database/models/user';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RequestService } from '@Shared/request/request.service';
import { SigninDTO } from './dto/signin-dto';
import { setCookie } from '@Src/utils/helpers';
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_BASE_OPTIONS,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET,
  SELF_URL,
  NODE_ENV,
} from '@Constants/config';
import { UserModel } from './models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: User,
    private readonly jwtService: JwtService,
    private readonly requestService: RequestService,
  ) {}

  private refreshTokenCookieOptions = {
    secure: NODE_ENV === 'production',
    domain: SELF_URL,
    httpOnly: true,
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
  };

  async signIn(data: SigninDTO, res): Promise<UserModel> {
    const { email, password } = data;

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      throw new NotFoundException('User is not found');
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isValidPassword) {
      throw new Error('Email or password is wrong');
    }

    const { accessToken, refreshToken } = await this.generateTokens(
      existingUser.id,
    );

    // TODO COOKIE IS NOT WORKING
    // setCookie(
    //   res,
    //   'refreshToken',
    //   refreshToken,
    //   this.refreshTokenCookieOptions,
    // );

    const { email: userEmail, id, fullName } = existingUser.dataValues;

    return { accessToken, email: userEmail, id, fullName };
  }

  async signUp(signupData: SignupInput): Promise<boolean> {
    const { fullName, email, password } = signupData;
    const image = '123456';

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword, 'hashedPassword');

    await User.build({
      email,
      password: hashedPassword,
      fullName,
      image,
    }).save();
    return true;
  }

  async generateTokens(
    userId: number,
    transaction?: Transaction,
    rememberMe = false,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await User.findByPk(userId, { transaction });
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user.id),
      this.generateRefreshToken(user.id, rememberMe),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateAccessToken(userId: number): Promise<string> {
    const opts: any = {
      ...JWT_BASE_OPTIONS,
      secret: JWT_ACCESS_TOKEN_SECRET,
      expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    };
    const payload = { userId };

    return this.jwtService.signAsync(payload, opts);
  }

  async generateRefreshToken(
    userId: number,
    rememberMe = false,
  ): Promise<string> {
    const opts = {
      ...JWT_BASE_OPTIONS,
      secret: JWT_REFRESH_TOKEN_SECRET,
      expiresIn: rememberMe ? '365d' : JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    };

    console.log(opts, 'OPTIONS');
    const payload = { userId };

    return this.jwtService.signAsync(payload, opts);
  }
}
