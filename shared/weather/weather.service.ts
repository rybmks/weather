import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { WeatherApiResponse as WeatherResponse } from './interfaces/weater-response.interface';

@Injectable() 
export class SharedWeatherService {
    constructor(private readonly httpService: HttpService) {}

    async getWeather(city: string): Promise<WeatherResponse> {
        const response = await this.httpService.axiosRef.get('https://api.weatherapi.com/v1/current.json', {
          params: {
            key: process.env.WEATHER_API_KEY,
            q: city,
          },
        });
        
        const weather: WeatherResponse = {
          city: response.data.location.name,
          temperature: response.data.current.temp_c,
          humidity: response.data.current.humidity,
          description: response.data.current.condition.text,
        };
    
        return weather;
      }
}