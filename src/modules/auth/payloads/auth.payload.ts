import { ObjectType } from '@nestjs/graphql';
import { UserPayload } from '../../users/payloads/user.payload';
import { TokenPayload } from './token.payload';

@ObjectType()
export class AuthPayload extends TokenPayload {
  user: UserPayload;
}
