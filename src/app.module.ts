import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RPCModule } from './rpc/modules/rpc.module';
import { RESTModule } from './rest/modules/rest.module';
import { GraphQLModule } from './mocked-graphql/modules/graphql.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RPCModule,
    RESTModule,
    GraphQLModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
