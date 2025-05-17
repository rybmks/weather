import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';

describe('AppController', () => {
  let appController: WeatherController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [],
    }).compile();

    appController = app.get<WeatherController>(WeatherController);
  });

});
