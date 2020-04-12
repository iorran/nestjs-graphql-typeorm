
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class RecipesArgs {
  @Field(type => Int) 
  skip: number = 0; 
}