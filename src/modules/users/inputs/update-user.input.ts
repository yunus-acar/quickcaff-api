import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @Length(6, 100)
  password?: string;

  @IsBoolean()
  @IsOptional()
  isEmailVerified?: boolean;
}
