import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class MessageInput {
  @Field()
  @MaxLength(300)
  content: string; 

  @Field() 
  userId: number; 
}