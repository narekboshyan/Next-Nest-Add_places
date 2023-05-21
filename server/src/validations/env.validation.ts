import { plainToInstance } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  MYSQL_USER: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_DATABASE: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_HOST: string;

  @IsNumber()
  MYSQL_PORT: number;

  @IsString()
  @IsNotEmpty()
  CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  APP_KEY: string;

  @IsString()
  @IsNotEmpty()
  CLIENT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  CALLBACK_URL: string;

  @IsString()
  @IsNotEmpty()
  GENERATE_TOKEN_URL: string;

  @IsString()
  @IsNotEmpty()
  GET_ME: string;

  @IsString()
  @IsNotEmpty()
  QUESTION_PRO_API: string;

  @IsString()
  @IsNotEmpty()
  REDIS_HOST: string;

  @IsNumber()
  @IsIn([6379, 10320])
  REDIS_PORT: number;

  @IsOptional()
  @IsString()
  REDIS_PASSWORD: string;

  @IsOptional()
  @IsString()
  REDIS_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
