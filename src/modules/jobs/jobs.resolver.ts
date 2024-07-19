import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { JobPayload } from './payloads/job.payload';
import { JobsService } from './jobs.service';
import { CoffeePayload } from '../coffees/payloads/coffee.payload';

@Resolver(() => JobPayload)
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [JobPayload])
  async getJobs(): Promise<JobPayload[]> {
    return this.jobsService.getJobs();
  }

  @Query(() => JobPayload)
  async getJobById(@Args('id') id: number): Promise<JobPayload> {
    return this.jobsService.getJobById(id);
  }

  @ResolveField(() => JobPayload)
  async job(@Parent() job: JobPayload): Promise<JobPayload> {
    return this.jobsService.getJobById(job.id);
  }

  @ResolveField(() => [CoffeePayload])
  async coffees(@Parent() job: JobPayload): Promise<CoffeePayload[]> {
    return this.jobsService.getCoffeesByJobId(job.id);
  }
}
