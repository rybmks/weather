import {  Controller, Get, Query } from '@nestjs/common';
import { GetCityWeatherDTO } from './dto/get-city-weather.dto';
import { SharedWeatherService } from 'shared/weather/weather.service';

@Controller()
export class WeatherController {
  constructor(private readonly weatherService: SharedWeatherService) {}

  @Get("weather")
  async getWeather(@Query() query:GetCityWeatherDTO) {
    
    const response = await this.weatherService.getWeather(query.city);

    return {message: response}
  }
}
