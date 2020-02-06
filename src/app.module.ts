import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Author } from './entities/author.entity';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      Author,
      Conversation,
      Message,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
