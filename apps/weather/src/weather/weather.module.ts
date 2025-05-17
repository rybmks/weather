import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { SharedWeatherModule } from 'shared/weather/weather.module';

@Module({
  imports: [SharedWeatherModule],
  controllers: [WeatherController],
})
export class WeatherModule {}
