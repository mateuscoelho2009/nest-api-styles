import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Author } from './author.entity';
import { Conversation } from './conversation.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(type => Author, author => author.messages)
  author: Author;

  @ManyToOne(type => Conversation, conversation => conversation.messages)
  conversation: Conversation;
}
