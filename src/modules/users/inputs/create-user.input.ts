import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { Role } from '../enum/role.enum';

@InputType()
export class CreateUserDto {
  @Field({ nullable: true })
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;

  @Field(() => Role, { defaultValue: Role.User, nullable: true })
  @IsEnum(Role)
  role: Role;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsBoolean()
  @IsOptional()
  isAccountDisabled?: boolean;
}
