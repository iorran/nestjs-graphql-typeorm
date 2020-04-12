import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import * as ormconfig from '../ormconfig';

@Module({
    imports: [ 
        TypeOrmModule.forRoot({
            ...ormconfig,
            autoLoadEntities: true
        }), 
        GraphQLModule.forRoot({
            autoSchemaFile: 'src/schema.gql',
            playground: true,
            installSubscriptionHandlers: true
        }),
    ]
})
export class CoreModule {}
