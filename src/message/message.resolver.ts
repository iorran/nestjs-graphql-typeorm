import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'; 
import Message from './message.entity';
import { MessageService } from './message.service'; 
import User from 'src/user/user.entity';

@Resolver('Message')
export class MessageResolver {
  
  constructor(
    private messageService: MessageService
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
    return this.messageService.create(message);
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
} 
