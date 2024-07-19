import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Local = 'local',
  Production = 'production',
  Staging = 'staging',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsNotEmpty()
  APP_ENV: Environment;

  @IsBoolean()
  @IsNotEmpty()
  APP_DEBUG: boolean;

  @IsString()
  @IsNotEmpty()
  APP_URL: string;

  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsNumber()
  @IsNotEmpty()
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: number;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsNumber()
  @IsNotEmpty()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: number;

  @IsString()
  @IsNotEmpty()
  JWT_VERIFICATION_TOKEN_SECRET: string;

  @IsNumber()
  @IsNotEmpty()
  JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  DATABASE_PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_USER: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_NAME: string;

  @IsBoolean()
  @IsOptional()
  TYPEORM_SYNCHRONIZE: boolean;

  @IsBoolean()
  @IsOptional()
  TYPEORM_LOGGING: boolean;

  @IsString()
  @IsNotEmpty()
  SENDGRID_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  EMAIL_FROM: string;

  @IsString()
  @IsNotEmpty()
  EMAIL_CONFIRMATION_URL: string;

  @IsString()
  @IsNotEmpty()
  REDIS_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  REDIS_PORT: number;

  @IsString()
  @IsNotEmpty()
  AWS_S3_ACCESS_KEY_ID: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_SECRET_ACCESS_KEY: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_BUCKET_NAME: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_ENDPOINT: string;

  @IsString()
  @IsNotEmpty()
  AWS_S3_BUCKET_REGION: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
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
