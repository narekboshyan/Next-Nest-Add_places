import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

@InputType()
export class SigninDTO {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  password: string;
}
