import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  from: process.env.EMAIL_FROM || '',
  confirmationLink: process.env.EMAIL_CONFIRMATION_URL || process.env.APP_URL,
  sendGridApiKey: process.env.SENDGRID_API_KEY || '',
}));
