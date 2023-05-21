import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

@InputType()
export class SignupInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
