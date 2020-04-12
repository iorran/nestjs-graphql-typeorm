import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'; 
import User from './model/user.entity';
import { UserService } from './user.service';
import { DeleteResult } from 'typeorm';

@Resolver('User')
class UserResolver {
  
  constructor(
    private userService: UserService
  ) {}

  // @Query(() => User)
  // public async findUsers(): Promise<User> {
  //   return this.userService.find();
  // } 

  @Mutation(returns => User)
  public async createUser(@Args('email') email: string) {
    return this.userService.create({ email });
  }
}
export default UserResolver;