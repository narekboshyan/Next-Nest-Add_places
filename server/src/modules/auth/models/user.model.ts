import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  id: number;
  fullName: string;
  email: string;
  accessToken: string;
}
