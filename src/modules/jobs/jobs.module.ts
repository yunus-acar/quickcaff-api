import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsRepository } from './jobs.repository';
import { JobsResolver } from './jobs.resolver';

@Module({
  providers: [JobsService, JobsRepository, JobsResolver],
  exports: [JobsService],
})
export class JobsModule {}
