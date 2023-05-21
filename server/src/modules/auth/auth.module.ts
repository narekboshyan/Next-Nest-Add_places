import { Module } from '@nestjs/common';
import { AuthResolver } from '@Modules/auth/auth.resolver';
import { AuthService } from '@Modules/auth/auth.service';
import { User } from '@Src/database/models/user';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { JWTModule } from '@Shared/jwt/jwt.module';
import { RequestService } from '@Src/shared/request/request.service';

@Module({
  imports: [SequelizeModule.forFeature([User, JWTModule])],
  providers: [AuthResolver, AuthService, JwtService, RequestService],
  exports: [AuthService],
})
export class AuthModule {}
