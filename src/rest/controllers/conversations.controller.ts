import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CONVERSATIONS_RESOURSE, BASE_URL, MESSAGES_RESOURSE, AUTHORS_RESOURSE } from '../utils/utils';
import { Conversation } from '../../entities/conversation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../entities/message.entity';

@Controller(`rest${CONVERSATIONS_RESOURSE}`)
export class ConversationsController {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  @Get()
  async getConversationsMetadata() {
    const [conversations, count] = await this.conversationRepository.findAndCount();
    const conversationsMetadata = conversations.map(({ id, title }) => ({
      href: `${BASE_URL}${CONVERSATIONS_RESOURSE}/${id}`,
      title,
      messages: `${BASE_URL}${CONVERSATIONS_RESOURSE}/${id}${MESSAGES_RESOURSE}`,
    }));
    
    return {
      count,
      value: conversationsMetadata,
    };
  }

  @Get(`/:id${MESSAGES_RESOURSE}`)
  async getMessagesMetadataFromConversation(@Param('id') id) {
    const [messages, count] = await this.messageRepository.findAndCount({
      where: {
        conversation: {
          id,
        },
      },
    });
    const messagesMetadata = [];

    for(let index = 0; index < count; index++) {
      const {
        id: messageId,
        text,
      } = messages[index];
      const { authorId } = await this.messageRepository.createQueryBuilder('messages')
        .where('messages.id = :messageId', { messageId })
        .select('messages.author_id')
        .getRawOne();

      messagesMetadata.push({
        href: `${BASE_URL}${MESSAGES_RESOURSE}/${messageId}`,
        conversation: `${BASE_URL}${CONVERSATIONS_RESOURSE}/${id}`,
        author: `${BASE_URL}${AUTHORS_RESOURSE}/${authorId}`,
        text,
      });
    }
    
    return {
      count,
      value: messagesMetadata,
      actions: {
        href: `${BASE_URL}${CONVERSATIONS_RESOURSE}/${id}${MESSAGES_RESOURSE}`,
        method: 'POST',
        desc: 'Sent message to conversation',
        value: [
          {
            name: 'text',
            desc: 'Your reply',
          },
        ],
      },
    }
  }

  @Post(`/:id${MESSAGES_RESOURSE}`)
  async sendMessage(@Param('id') id, @Body('text') text) {
    const message = await this.messageRepository.save({
      text,
      author: {
        id: 1
      },
      conversation: {
        id,
      },
    });

    return {
      href: `${BASE_URL}${MESSAGES_RESOURSE}/${message.id}`,
      conversation: `${BASE_URL}${CONVERSATIONS_RESOURSE}/${id}`,
      text,
    };
  }
}
