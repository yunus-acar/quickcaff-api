import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { CustomLogger } from './shared/logger/custom-logger';
import { graphqlUploadExpress } from 'graphql-upload-minimal';

const bootstrap = async () => {
  const server = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  server.useLogger(server.get(CustomLogger));
  server.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  server.use((req: any, res: any, next: any) => {
    if (req.url.includes('/graphql')) {
      graphqlUploadExpress({
        maxFileSize: 1000000,
        maxFiles: 2,
      })(req, res, next);
    } else {
      next();
    }
  });
  const configService = server.get(ConfigService);

  server.enableCors({
    origin: configService.get('app.frontendURL'),
    credentials: true,
  });

  await server.listen(configService.get('app.port'));
};

bootstrap();
