import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Message from './model/message.entity';
import { Repository, DeleteResult } from 'typeorm'; 

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async count(): Promise<number> {
    return await this.messageRepository.count();
  }

  async find(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async create(message: Message): Promise<Message> {  
    return await this.messageRepository.save(message);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.messageRepository.delete(id);
  }

  async update(id: number, message: Message): Promise<Message> {
    await this.messageRepository.update(id, message);
    return this.messageRepository.findOne(id);
  }
}
