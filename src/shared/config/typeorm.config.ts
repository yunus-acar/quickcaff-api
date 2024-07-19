import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DatabaseLogger } from '../database/database-logger';
import { writeFileSync } from 'fs';

class TypeOrmConfig {
  static async getOrmConfig(
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> {
    const options: TypeOrmModuleOptions = {
      type: 'postgres',
      host: configService.get('database.host'),
      port: configService.get('database.port'),
      username: configService.get('database.username'),
      password: configService.get('database.password'),
      database: configService.get('database.name'),
      synchronize: configService.get('typeorm.synchronize'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/**/*{.js,.ts}'],
    };

    const isLogging = configService.get('typeorm.logging') || false;
    if (!isLogging) {
      return options;
    }

    writeFileSync('ormconfig.json', JSON.stringify(options, null, 2));

    return {
      ...options,
      logger: new DatabaseLogger(),
    };
  }
}

export const typeormModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
};

export default registerAs('typeorm', () => ({
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'false' ? false : true,
  logging: process.env.TYPEORM_LOGGING === 'true' ? true : false,
}));
