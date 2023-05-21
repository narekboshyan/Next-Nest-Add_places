import { SigninDTO } from './dto/signin-dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from '@Modules/auth/auth.service';
import { User } from '@Src/database/models/user';
import { SignupInput } from './dto/signup-dto';
import { Res } from '@nestjs/common';
import { UserModel } from './models/user.model';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signIn(
    @Args('data') data: SigninDTO,
    @Res() res: Response,
  ): Promise<UserModel> {
    const userData = await this.authService.signIn(data, res);

    console.log(userData, 'userData');
    return userData;
  }

  @Mutation(() => Boolean)
  async signUp(@Args('data') data: SignupInput): Promise<boolean> {
    return this.authService.signUp(data);
  }

  @Query(() => Boolean)
  async testing() {
    return true;
  }
}
