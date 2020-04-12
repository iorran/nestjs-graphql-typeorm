import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';

@Module({
    imports: [
        UserModule,
        MessageModule,
    ], 
    exports: []
})
export class SharedModule {}
