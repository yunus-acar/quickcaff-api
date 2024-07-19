import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { CoffeesModule } from './modules/coffees/coffees.module';

@Module({
  imports: [UsersModule, AuthModule, JobsModule, CoffeesModule],
})
export class GraphqlModule {}
