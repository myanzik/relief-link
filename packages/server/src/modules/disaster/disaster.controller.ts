import { Controller, Get, Param } from '@nestjs/common';
import { DisasterService } from './disaster.service.js';

interface DisasterSearch {
  lat: number;
  lng: number;
}

@Controller('disaster')
export class DisasterController {
  constructor(private readonly disasterService: DisasterService) {}

  @Get()
  async checkDisaster(@Param() lat: string, @Param() lng: string) {
    const result = await this.disasterService.checkDisaster(
      parseFloat(lat),
      parseFloat(lng)
    );
    return result;
  }
}
