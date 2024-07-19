import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  bucketName: process.env.AWS_S3_BUCKET_NAME,
  endpoint: process.env.AWS_S3_ENDPOINT,
  region: process.env.AWS_S3_BUCKET_REGION,
}));
