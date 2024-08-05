import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { QUEUES } from '@warehouse/domain/enums/queues.enum';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.QUEUES_URL],
        queue: QUEUES.WAREHOUSE_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
  Logger.log('Microservice warehouse is listening');
}
bootstrap();
