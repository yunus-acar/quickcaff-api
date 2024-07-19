import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { ConfigService } from '@nestjs/config';
import { File } from 'src/shared/interface/file.interface';
import { FileUpload } from 'graphql-upload-minimal';

@Injectable()
export class AwsService {
  private logger = new Logger('AwsS3Service');
  private readonly _s3: AWS.S3;

  constructor(private configService: ConfigService) {
    const options: AWS.S3.Types.ClientConfiguration = {
      accessKeyId: configService.get('aws.accessKeyId'),
      secretAccessKey: configService.get('aws.secretAccessKey'),
      endpoint: configService.get('aws.endpoint'),
      signatureVersion: 'v4',
      params: {
        Bucket: configService.get('aws.bucket'),
      },
      region: configService.get('aws.region'),
    };

    this._s3 = new AWS.S3(options);
  }

  async uploadFile(file: FileUpload): Promise<any> {
    try {
      const key = 'quick-caff/' + file.filename;
      await this._s3
        .putObject({
          Bucket: this.configService.get('aws.bucket'),
          Body: file.createReadStream(),
          ACL: 'public-read',
          Key: key,
        })
        .promise();

      return {
        key: key,
      };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException(error.message, error);
    }
  }
}
