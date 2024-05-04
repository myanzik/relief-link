import { Module } from '@nestjs/common';
import { DisasterService } from './disaster.service.js';
import { DisasterController } from './disaster.controller.js';

@Module({
  providers: [DisasterService],
  controllers: [DisasterController],
})
export class DisasterModule {}
