import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfoPayload } from './page-info.payload';

export default function Paginated<TItem>(TItemClass: Type<TItem>) {
  @ObjectType(`${TItemClass.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => TItemClass)
    node: TItem;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType], { nullable: true })
    edges: Array<EdgeType>;

    @Field(() => PageInfoPayload)
    pageInfo: PageInfoPayload;

    @Field(() => Int)
    totalCount: number;
  }
  return PaginatedType;
}
