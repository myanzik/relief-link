import { join } from 'path';
import { readFileSync } from 'fs';
import { Injectable, Logger } from '@nestjs/common';

import { Dictionary } from '../../types';

import { ConfigService } from '~/modules/config/config.service';

@Injectable()
export class StatusService {
  private logger = new Logger(StatusService.name);
  private version: Dictionary<string>;

  constructor(private readonly configService: ConfigService) {
    this.version = { SERVER_VERSION: '1.0.0' };
  }

  getStatus(): string {
    this.logger.log('log from statusService.getStatus()');
    return `Hello world from Nest running on ${this.configService.host}:${this.configService.port}!`;
  }

  getVersion(): Dictionary<string> {
    return this.version;
  }
}
