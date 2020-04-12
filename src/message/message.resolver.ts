import { UserService } from './../user/user.service';
import { Resolver, Query, Mutation, Args, Subscription, Parent, ResolveField } from '@nestjs/graphql'; 

import Message from './model/message.entity';
import { MessageService } from './message.service'; 
import User from 'src/user/model/user.entity'; 

import { MessageInput } from './dto/message.input';

import { PubSub } from 'graphql-subscriptions';
const MESSAGE_ADDED = '@MESSAGE_ADDED';

const pubSub = new PubSub();

@Resolver(of => Message)
export class MessageResolver {
  
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService
  ) {}

  @Query(() => [Message])
  public async countMessages(): Promise<number> {
    return this.messageService.count();
  }

  @Query(() => [Message])
  public async findAllMessages(): Promise<Message[]> {
    return this.messageService.findAll();
  } 

  @Mutation(returns => Message)
  public async createMessage(
    @Args('data') message: MessageInput
  ) { 
    const newMessage = this.messageService.create(message);
    pubSub.publish(MESSAGE_ADDED, newMessage );
    return newMessage;
  }

  @Mutation(() => Message)
  async updateMessage(
    @Args('id') id: number,
    @Args('data') message: MessageInput
  ) { 
    return this.messageService.update(id, message);
  }

  @Mutation(() => Message)
  async deleteMessage(@Args('id') id: number) {
    return this.messageService.delete(id);
  }

  @Subscription(returns => Message)
  messageAdded() {
    return pubSub.asyncIterator(MESSAGE_ADDED);
  }

  @ResolveField(() => User, { name: 'user' })
  async getUser(@Parent() parent: Message): Promise<User> {
    return this.userService.find(parent.userId);
  }
} 
