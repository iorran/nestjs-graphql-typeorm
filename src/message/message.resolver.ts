import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql'; 

import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';

import Message from './message.entity';
import { MessageService } from './message.service'; 
import User from 'src/user/user.entity'; 

import { PubSub } from 'graphql-subscriptions';
const MESSAGE_ADDED = '@MESSAGE_ADDED';

const pubSub = new PubSub();

@Resolver(of => Message)
export class MessageResolver {
  
  constructor(
    private messageService: MessageService,
    // @Inject('PUB_SUB') private pubSub: PubSubEngine
  ) {}

  @Query(() => [Message])
  public async countMessages(): Promise<number> {
    return this.messageService.count();
  }

  @Query(() => [Message])
  public async findMessage(): Promise<Message[]> {
    return this.messageService.find();
  } 

  @Mutation(returns => Message)
  public async createMessage(
    @Args('content') content: string,
    @Args('userId') userId: number
  ) { 
    const message = new Message();
    message.content = content;

    const user = new User();
    user.id = userId;
    
    message.userConnection = user;

    const newMessage = this.messageService.create(message);

    pubSub.publish(MESSAGE_ADDED, newMessage );

    return newMessage;
  }

  @Mutation(() => Message)
  async updateMessage(
    @Args('id') id: number,
    @Args('content') content: string
  ) {
    const message = new Message();
    message.id = id; 
    message.content = content; 
     
    return this.messageService.update(id, message);
  }

  @Mutation(() => Message)
  async deleteMessage(@Args('id') id: string) {
    return this.messageService.delete(id);
  }
  
  @Subscription(returns => Message)
  messageAdded() {
    return pubSub.asyncIterator(MESSAGE_ADDED);
  }
} 
