import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @Field()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
