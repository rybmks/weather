import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = new Logger("NestApp");
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, transform: true}));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
