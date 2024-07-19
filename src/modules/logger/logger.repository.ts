import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateLogDto } from './inputs/create-log.input';
import { Log } from './entities/log.entity';

@Injectable()
export class LoggerRepository extends Repository<Log> {
  constructor(private dataSource: DataSource) {
    super(Log, dataSource.createEntityManager());
  }
  async createLog(log: CreateLogDto) {
    const newLog = this.create(log);

    await this.save(newLog, {
      data: {
        isCreatingLogs: true,
      },
    });

    return newLog;
  }
}
