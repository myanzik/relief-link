import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { StatusModule } from './status/status.module';
import { AccountModule } from './account/account.module';
import { DisasterModule } from './disaster/disaster.module';
import { AuthzModule } from './auth/auth.module';
// Added import statement for DisasterModule

@Module({
  imports: [
    ConfigModule,
    StatusModule,
    DisasterModule,
    AuthzModule,
    AccountModule,
  ],
})
export class APIModule {}
