import { Field, ObjectType } from '@nestjs/graphql';
import { BasePayload } from 'src/shared/graphql/base.payload';

@ObjectType()
export class JobPayload extends BasePayload {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;
}
