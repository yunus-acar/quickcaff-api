import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;
}
