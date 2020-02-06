import { Module } from '@nestjs/common';
import { RESTController } from '../controllers/rest.controller';
import { Author } from '../../entities/author.entity';
import { Conversation } from '../../entities/conversation.entity';
import { Message } from '../../entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsController } from '../controllers/conversations.controller';
import { AuthorsController } from '../controllers/authors.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author,
      Conversation,
      Message,
    ]),
  ],
  controllers: [
    RESTController,
    ConversationsController,
    AuthorsController,
  ],
})
export class RESTModule { }
