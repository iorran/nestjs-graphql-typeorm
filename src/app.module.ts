import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import * as ormconfig from './ormconfig';

import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormconfig,
      autoLoadEntities: true
    }), 
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      playground: true
    }),
    UserModule,
    MessageModule
  ]
})
export class AppModule {}
