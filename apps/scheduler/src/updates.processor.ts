import { Processor, WorkerHost} from "@nestjs/bullmq";
import { Job } from 'bullmq';
import { Logger } from "@nestjs/common";
import { EmailService } from "shared/email/email.service";
import { SharedWeatherService } from "shared/weather/weather.service";

@Processor('weather-sheduler')
export class UpdatesProcessor extends WorkerHost {
    private readonly logger = new Logger(UpdatesProcessor.name);

    constructor(
        private readonly emailService: EmailService,
        private readonly weatherService: SharedWeatherService
    ) {
        super()
    }

    async process(job: Job<any, any, string>): Promise<any> {
        const {email, city, token} = job.data;
        
        let weather = await this.weatherService.getWeather(city); 
        this.emailService.sendWeatherUpdate(email, city, token, weather);
    }
    
}