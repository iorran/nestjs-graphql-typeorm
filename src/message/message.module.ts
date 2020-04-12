import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import Message from './model/message.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    UserModule
  ],
  providers: [MessageService, MessageResolver]
})
export class MessageModule {}
