import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from './logging-middleware/logging.middleware';
import { AppController } from './app.controller';
import { WeatherModule } from './weather/weather.module';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [WeatherModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
