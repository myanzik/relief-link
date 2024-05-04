import { Body, Controller, Post } from '@nestjs/common';
import { DisasterService } from './disaster.service';

interface DisasterSearch {
  lat: number;
  lng: number;
}

@Controller('disaster')
export class DisasterController {
  constructor(private readonly disasterService: DisasterService) {}

  @Post()
  async checkDisaster(@Body() search: DisasterSearch) {
    const result = await this.disasterService.checkDisaster(
      search.lat,
      search.lng
    );
    return result;
  }
}
