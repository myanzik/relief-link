import { Module } from '@nestjs/common';
import { DisasterService } from './disaster.service';
import { DisasterController } from './disaster.controller';

@Module({
  providers: [DisasterService],
  controllers: [DisasterController],
})
export class DisasterModule {}
