import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'; 
import User from './model/user.entity';
import { UserService } from './user.service';
import { DeleteResult } from 'typeorm';

@Resolver('User')
class UserResolver {
  
  constructor(
    private userService: UserService
  ) {}

  @Query(() => [User])
  public async countUsers(): Promise<number> {
    return this.userService.count();
  }

  @Query(() => [User])
  public async findUsers(): Promise<User[]> {
    return this.userService.find();
  } 

  @Mutation(returns => User)
  public async createUser(@Args('email') email: string) {
    return this.userService.create({ email });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('email') email: string
  ): Promise<User> {
    return this.userService.update(id, { email });
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
export default UserResolver;