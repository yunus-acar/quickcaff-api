import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLogger } from '../../shared/logger/custom-logger';
import { Log } from './entities/log.entity';
import { LoggerService } from './logger.service';
import { LoggerRepository } from './logger.repository';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Log])],
  providers: [CustomLogger, LoggerService, LoggerRepository],
  exports: [CustomLogger],
})
export class LoggerModule {}
