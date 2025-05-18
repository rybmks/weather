import { Controller, Get } from '@nestjs/common';
import { SchedulerService } from './app.service';

@Controller()
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Get("/healthcheck")
  getHello(): string {
    return this.schedulerService.healthcheck();
  }
}
