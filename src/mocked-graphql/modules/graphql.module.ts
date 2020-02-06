import { Module } from '@nestjs/common';
import { GraphQLController } from '../controllers/graphql.controller';
import { Author } from '../../entities/author.entity';
import { Conversation } from '../../entities/conversation.entity';
import { Message } from '../../entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author,
      Conversation,
      Message,
    ]),
  ],
  controllers: [GraphQLController],
})
export class GraphQLModule {}
