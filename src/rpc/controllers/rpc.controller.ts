import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../../entities/author.entity';
import { Conversation } from '../../entities/conversation.entity';
import { Message } from '../../entities/message.entity';

@Controller('rpc')
export class RPCController {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,

    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  @Get('listConversations')
  async listConversations(): Promise<Conversation[]> {
    return this.conversationRepository.find();
  }

  @Get('listMessages')
  async listMessages(@Query('conversationId') conversationId): Promise<Message[]> {
    return this.messageRepository.find({
      where: {
        conversation: {
          id: conversationId,
        },
      },
    });
  }

  @Post('sendMessage')
  async sendMessage(@Query('conversationId') conversationId, @Body('text') text: string): Promise<Message> {
    return this.messageRepository.save({
      text,
      author: {
        id: 1
      },
      conversation: {
        id: conversationId,
      },
    })
  }

  @Get('getAuthor')
  async getAuthor(@Query('messageId') messageId): Promise<Author> {
    const { authorId } = await this.messageRepository.createQueryBuilder('messages')
      .where('messages.id = :messageId', { messageId })
      .select('messages.author_id')
      .getRawOne();

    return this.authorRepository.findOne(authorId);
  }
}
