import { SigninDTO } from './dto/signin-dto';
import { AuthService } from '@Modules/auth/auth.service';
import { SignupInput } from './dto/signup-dto';
import { UserModel } from './models/user.model';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(data: SigninDTO, res: Response): Promise<UserModel>;
    signUp(data: SignupInput): Promise<boolean>;
    testing(): Promise<boolean>;
}
