"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_resolver_1 = require("./auth.resolver");
const auth_service_1 = require("./auth.service");
const user_1 = require("../../database/models/user");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const jwt_module_1 = require("../../shared/jwt/jwt.module");
const request_service_1 = require("../../shared/request/request.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([user_1.User, jwt_module_1.JWTModule])],
        providers: [auth_resolver_1.AuthResolver, auth_service_1.AuthService, jwt_1.JwtService, request_service_1.RequestService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map