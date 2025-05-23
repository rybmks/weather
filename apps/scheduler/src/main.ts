import { NestFactory } from '@nestjs/core';
import { SchedulerModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(SchedulerModule);
  await app.listen(process.env.SCHEDULER_PORT ?? 3001);
}

bootstrap();
