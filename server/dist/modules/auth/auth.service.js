"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../../database/models/user");
const sequelize_1 = require("@nestjs/sequelize");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const request_service_1 = require("../../shared/request/request.service");
const config_1 = require("../../constants/config");
let AuthService = class AuthService {
    constructor(userModel, jwtService, requestService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.requestService = requestService;
        this.refreshTokenCookieOptions = {
            secure: config_1.NODE_ENV === 'production',
            domain: config_1.SELF_URL,
            httpOnly: true,
            sameSite: config_1.NODE_ENV === 'production' ? 'none' : 'lax',
        };
    }
    async signIn(data, res) {
        const { email, password } = data;
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (!existingUser) {
            throw new common_1.NotFoundException('User is not found');
        }
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            throw new Error('Email or password is wrong');
        }
        const { accessToken, refreshToken } = await this.generateTokens(existingUser.id);
        const { email: userEmail, id, fullName } = existingUser.dataValues;
        return { accessToken, email: userEmail, id, fullName };
    }
    async signUp(signupData) {
        const { fullName, email, password } = signupData;
        const image = '123456';
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log(hashedPassword, 'hashedPassword');
        await user_1.User.build({
            email,
            password: hashedPassword,
            fullName,
            image,
        }).save();
        return true;
    }
    async generateTokens(userId, transaction, rememberMe = false) {
        const user = await user_1.User.findByPk(userId, { transaction });
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(user.id),
            this.generateRefreshToken(user.id, rememberMe),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async generateAccessToken(userId) {
        const opts = Object.assign(Object.assign({}, config_1.JWT_BASE_OPTIONS), { secret: config_1.JWT_ACCESS_TOKEN_SECRET, expiresIn: config_1.JWT_ACCESS_TOKEN_EXPIRATION_TIME });
        const payload = { userId };
        return this.jwtService.signAsync(payload, opts);
    }
    async generateRefreshToken(userId, rememberMe = false) {
        const opts = Object.assign(Object.assign({}, config_1.JWT_BASE_OPTIONS), { secret: config_1.JWT_REFRESH_TOKEN_SECRET, expiresIn: rememberMe ? '365d' : config_1.JWT_REFRESH_TOKEN_EXPIRATION_TIME });
        console.log(opts, 'OPTIONS');
        const payload = { userId };
        return this.jwtService.signAsync(payload, opts);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_1.User)),
    __metadata("design:paramtypes", [user_1.User,
        jwt_1.JwtService,
        request_service_1.RequestService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map