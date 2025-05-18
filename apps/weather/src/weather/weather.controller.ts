import {  Controller, Get, Query } from '@nestjs/common';
import { GetCityWeatherDTO } from './dto/get-city-weather.dto';
import { SharedWeatherService } from 'shared/weather/weather.service';

@Controller()
export class WeatherController {
  constructor(private readonly weatherService: SharedWeatherService) {}

  @Get("weather")
  async getWeather(@Query() query:GetCityWeatherDTO) {
    
    try {
      const response = await this.weatherService.getWeather(query.city);
      return { temperature: response.temperature, humidity: response.humidity, description: response.description };
    } catch (error) {
      throw error;
    }
  }
}
