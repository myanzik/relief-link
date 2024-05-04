import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as dotenv from 'dotenv';
import { APIModule } from './modules/api.module';
import { ConfigService } from './modules/config/config.service';

dotenv.config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APIModule);
  const config = new DocumentBuilder()
    .setTitle('ReliefLink')
    .setDescription('The ReliefLink API description')
    .setVersion('1.0')
    .addTag('relief')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  app.enableCors({ origin: configService.corsWhiteList });
  await app.listen(configService.port);
}

bootstrap();
