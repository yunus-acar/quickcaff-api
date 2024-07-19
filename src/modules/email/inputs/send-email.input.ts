import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailInput {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  html: string;
}
