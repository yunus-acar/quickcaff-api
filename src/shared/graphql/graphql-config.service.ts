import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createGqlOptions(): ApolloDriverConfig {
    return {
      // schema options
      autoSchemaFile: './src/schema.graphql',
      sortSchema: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      // subscription
      installSubscriptionHandlers: true,
      includeStacktraceInErrorResponses: true,

      // playground
      playground: false,
      plugins:
        this.configService.get('app.env') !== 'production'
          ? [ApolloServerPluginLandingPageLocalDefault()]
          : [],
      context: ({ req }) => ({ req }),
    };
  }
}
