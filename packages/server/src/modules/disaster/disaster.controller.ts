import { Controller, Get, Query } from '@nestjs/common';
import { DisasterService } from './disaster.service.js';

interface DisasterSearch {
  lat: number;
  lng: number;
}

@Controller('disaster')
export class DisasterController {
  constructor(private readonly disasterService: DisasterService) {}

  @Get()
  async checkDisaster(@Query('lat') lat: string, @Query('lng') lng: string) {
    console.log(lat, lng);
    const result = await this.disasterService.checkDisaster(
      parseFloat(lat),
      parseFloat(lng)
    );
    return result;
  }
}
