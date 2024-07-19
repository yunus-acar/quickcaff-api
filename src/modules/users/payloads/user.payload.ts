import { Field, ObjectType } from '@nestjs/graphql';
import { BasePayload } from '../../../shared/graphql/base.payload';
import { Role } from '../enum/role.enum';
import { JobPayload } from 'src/modules/jobs/payloads/job.payload';

@ObjectType()
export class UserPayload extends BasePayload {
  @Field()
  name: string;

  @Field(() => Role)
  role: Role;

  @Field()
  email: string;

  @Field({ nullable: true })
  jobId?: number;

  @Field({ nullable: true })
  job?: JobPayload;

  // Hidden fields
  isAccountDisabled: boolean;
}
