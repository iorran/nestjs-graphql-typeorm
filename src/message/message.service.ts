import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Message from './model/message.entity';
import { Repository, DeleteResult } from 'typeorm'; 
import { MessageInput } from './dto/message.input';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async count(): Promise<number> {
    return await this.messageRepository.count();
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async create(newMessage: MessageInput): Promise<Message> {      
    const message = this.messageRepository.create(newMessage);
    return await this.messageRepository.save(message);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.messageRepository.delete(id);
  }

  async update(id: number, updatedMessage: MessageInput): Promise<Message> {
    const message = this.messageRepository.create(updatedMessage);
    await this.messageRepository.update(id, message);
    return this.messageRepository.findOne(id);
  }
}
