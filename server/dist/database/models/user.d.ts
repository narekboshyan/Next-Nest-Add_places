import { BaseModel } from './base.model';
import { Place } from './place';
export declare class User extends BaseModel<User> {
    fullName: string;
    email: string;
    password: string;
    image: string;
    visitorAction: Place[];
    accessToken?: string;
}
