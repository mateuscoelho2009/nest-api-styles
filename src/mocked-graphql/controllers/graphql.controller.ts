import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../../entities/author.entity';
import { Conversation } from '../../entities/conversation.entity';
import { Message } from '../../entities/message.entity';

@Controller('graphql')
export class GraphQLController {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  @Post()
  async listConversations() {
    const [conversations, count] = await this.conversationRepository.findAndCount();

    const data = [];

    for(let index = 0; index < count; index +=1) {
      const messages = await this.messageRepository.find({
        where: {
          conversation: {
            id: conversations[index].id,
          },
        },
      });

      data.push({
        title: conversations[index].title,
        messages: messages.map(message => ({ text: message.text })),
      })
    }

    return {
      data: {
        listConversations: data,
      },
    };
  }
}
