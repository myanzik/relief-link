import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { APIModule } from './modules/api.module';
import { ConfigService } from './modules/config/config.service';

dotenv.config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APIModule);
  const configService = app.get(ConfigService);
  app.enableCors({ origin: configService.corsWhiteList });
  await app.listen(configService.port);
}

bootstrap();
