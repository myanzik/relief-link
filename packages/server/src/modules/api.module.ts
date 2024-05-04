import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module.js';
import { StatusModule } from './status/status.module.js';
import { AccountModule } from './account/account.module.js';
import { DisasterModule } from './disaster/disaster.module.js';
import { AuthzModule } from './auth/auth.module.js';
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
