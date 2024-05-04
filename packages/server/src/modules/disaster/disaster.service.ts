import { Injectable, Logger } from '@nestjs/common';
import Client from 'predicthq';
import { ConfigService } from '../config/config.service';

const DISASTER_RANGE = 100; // 100km

const TEST_DISASTER_COORDS = [90, 0];

@Injectable()
export class DisasterService {
  private logger = new Logger(DisasterService.name);

  client: Client;
  constructor(private configService: ConfigService) {
    this.client = new Client({
      access_token: this.configService.predictHqAccessToken,
    });
  }
  /// Use the PredictHQ API to check if a disaster is happening at the given location
  async checkDisaster(lat: number, lng: number): Promise<0 | 1> {
    if (lat == TEST_DISASTER_COORDS[0] && lng == TEST_DISASTER_COORDS[1]) {
      return 1;
    }

    // Call the PredictHQ API
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 0);

    const query = {
      within: `${DISASTER_RANGE}km@${lat},${lng}`,
      category: 'disasters',
      label: 'earthquake,wildfire,fire,flood',
      local_rank_level: '4,5',
      rank_level: '4,5',

      'active.gte': start.toJSON().replace('.000', ''),
      'active.lte': end.toJSON().replace('.000', ''),
    };
    const { result } = await this.client.events.search(query);
    const { count, results: events } = result;
    this.logger.log(`Found ${count} events`, { result, query, events });
    return count > 0 ? 1 : 0;
  }
}
