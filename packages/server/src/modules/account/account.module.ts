import { Module } from '@nestjs/common';

import { AccountController } from './account.controller';
// import { StatusService } from './account.service';

@Module({
  controllers: [AccountController],
  //   providers: [StatusService],
})
export class AccountModule {}
