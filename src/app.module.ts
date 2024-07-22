import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { GraphqlModule } from './graphql.module';
import { LoggerModule } from './modules/logger/logger.module';

import { DatabaseModule } from './shared/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './shared/graphql/graphql-config.service';

import typeormConfig from './shared/config/typeorm.config';
import appConfig from './shared/config/app.config';
import databaseConfig from './shared/config/database.config';
import jwtConfig from './shared/config/jwt.config';
import emailConfig from './shared/config/email.config';
import { EmailModule } from './modules/email/email.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import awsConfig from './shared/config/aws.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validate,
      load: [
        appConfig,
        databaseConfig,
        typeormConfig,
        jwtConfig,
        emailConfig,
        awsConfig,
      ],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    CacheModule.register({
      store: redisStore,
      url: process.env.REDIS_URL,
      isGlobal: true,
    }),
    LoggerModule,
    GraphqlModule,
    DatabaseModule,
    EmailModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}
