import { Injectable } from '@nestjs/common';
import { JobsRepository } from './jobs.repository';
import { JobPayload } from './payloads/job.payload';
import { CoffeePayload } from '../coffees/payloads/coffee.payload';

@Injectable()
export class JobsService {
  constructor(private readonly repository: JobsRepository) {}

  async getJobs(): Promise<JobPayload[]> {
    return this.repository.getJobs();
  }

  async getJobByUserId(userId: number): Promise<JobPayload> {
    return this.repository.getJobByUserId(userId);
  }

  async getJobsByCoffeeId(coffeeId: number): Promise<JobPayload[]> {
    return this.repository.getJobsByCoffeeId(coffeeId);
  }

  async getJobById(id: number): Promise<JobPayload> {
    return this.repository.getJobById(id);
  }

  async getCoffeesByJobId(jobId: number): Promise<CoffeePayload[]> {
    return this.repository.getCoffeesByJobId(jobId);
  }
}
