import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  SuperAdmin = 'SuperAdmin',
  User = 'User',
  Admin = 'Admin',
}

registerEnumType(Role, {
  name: 'Role',
  description: "User's role",
});
