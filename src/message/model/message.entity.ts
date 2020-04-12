import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm'; 

import User from 'src/user/model/user.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity({name: 'messages'})
export default class Message {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({name: 'user_id'})
  userId: number;

  @Field()
  @Column()
  content: string;

  @Field()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Field()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @Field(() => User)
  user: User;

  // Associations
  @ManyToOne(() => User, user => user.messageConnection, {primary: true})
  @JoinColumn({name: 'user_id'})
  userConnection: Promise<User>;
}