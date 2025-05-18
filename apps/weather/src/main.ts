import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  
  app.setGlobalPrefix('api');

  const logger = new Logger("NestApp");
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, transform: true}));

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
