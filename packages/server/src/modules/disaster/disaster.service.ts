import { Injectable, Logger } from '@nestjs/common';
import Client from 'predicthq';

const DISASTER_RANGE = 100; // 100km

@Injectable()
export class DisasterService {
  private logger = new Logger(DisasterService.name);

  client: Client;
  constructor() {
    console.log(process.env.PORT);
    this.client = new Client({
      access_token: process.env.PREDICT_HQ_ACCESS_TOKEN || '',
    });
  }
  /// Use the PredictHQ API to check if a disaster is happening at the given location
  async checkDisaster(lat: number, lng: number): Promise<0 | 1> {
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
    const { count, results: events } = await this.client.events.search(query);
    this.logger.log(`Found ${count} events`, { query, events });
    return count > 0 ? 1 : 0;
  }
}
