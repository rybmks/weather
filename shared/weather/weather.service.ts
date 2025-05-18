import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { WeatherApiResponse as WeatherResponse } from './interfaces/weater-response.interface';

@Injectable() 
export class SharedWeatherService {
    constructor(private readonly httpService: HttpService) {}

    async getWeather(city: string): Promise<WeatherResponse> {
      try {
        const response = await this.httpService.axiosRef.get('https://api.weatherapi.com/v1/current.json', {
          params: {
            key: process.env.WEATHER_API_KEY,
            q: city,
          },
        });
        
        if (response.status == 400) {
          throw new NotFoundException("City not found");
        }

        const weather: WeatherResponse = {
          city: response.data.location.name,
          temperature: response.data.current.temp_c,
          humidity: response.data.current.humidity,
          description: response.data.current.condition.text,
        };
    
        return weather;
      }
      catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error?.code === 1006) {
          throw new NotFoundException('City not found');
        }
      
        console.error(error.response?.data || error.message);
      
        throw new InternalServerErrorException('Something went wrong');
      }
    }
}