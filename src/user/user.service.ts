import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import User from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async count(): Promise<number> {
    return await this.usersRepository.count();
  }

  async find(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async create(user: any): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async update(id: string, user: any): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOne(id);
  }
}
