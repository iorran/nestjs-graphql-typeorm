
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class MessageArgs {
  @Field(type => Int) 
  content; 
}