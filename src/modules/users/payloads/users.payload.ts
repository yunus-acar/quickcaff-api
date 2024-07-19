import { Field, ObjectType } from '@nestjs/graphql';
import { UserPayload } from './user.payload';

@ObjectType()
export class UsersPayload {
  @Field(() => [UserPayload])
  users: UserPayload[];

  @Field(() => Number)
  count: number;
}
