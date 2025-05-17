import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SharedWeatherService } from './weather.service';

@Module({
    imports: [HttpModule],
    providers: [SharedWeatherService],
    exports: [SharedWeatherService]
})
export class SharedWeatherModule {}