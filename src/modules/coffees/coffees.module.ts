import { Module } from '@nestjs/common';
import { CoffeesRepository } from './coffees.repository';
import { CoffeesService } from './coffees.service';
import { CoffeesResolver } from './coffees.resolver';
import { JobsModule } from '../jobs/jobs.module';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [JobsModule, AwsModule],
  providers: [CoffeesRepository, CoffeesService, CoffeesResolver],
})
export class CoffeesModule {}
