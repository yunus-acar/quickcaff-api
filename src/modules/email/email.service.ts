import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { SendEmailInput } from './inputs/send-email.input';

@Injectable()
export class EmailService {
  private sendGrid: typeof SendGrid;
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('email.sendGridApiKey'));
    this.sendGrid = SendGrid;
  }

  async send({ to, subject, text, html }: SendEmailInput) {
    await this.sendGrid.send({
      from: this.configService.get<string>('email.from'),
      to,
      subject,
      text,
      html,
    });
  }

  async sendEmailVerification(email: string, token: string) {
    const url = `${this.configService.get<string>('email.confirmationLink')}?token=${token}`;

    await this.send({
      to: email,
      subject: 'Verify your email address',
      text: `Click this link to verify your email: ${url}`,
      html: `Click this link to verify your email: <a href="${url}">${url}</a>`,
    });
  }

  async sendPasswordReset(email: string, token: string) {
    const url = `${this.configService.get<string>('email.resetPasswordLink')}?token=${token}`;

    await this.send({
      to: email,
      subject: 'Reset your password',
      text: `Click this link to reset your password: ${url}`,
      html: `Click this link to reset your password: <a href="${url}">${url}</a>`,
    });
  }
}
