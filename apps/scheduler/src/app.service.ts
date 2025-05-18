import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'shared/prisma/prisma.service';
import { Queue } from 'bullmq';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectQueue("weather-scheduler") private weatherQueue: Queue,
    private readonly prisma: PrismaService) {}
  
  healthcheck(): string {
    return 'Hello!';
  }

  @Cron(CronExpression.EVERY_HOUR)
  async hourlyUpdates(){ 
    this.logger.log("HOURLY UPDATE");
    
    const hourly_subs = await this.prisma.subscription.findMany({
      where: {is_confirmed: true, frequency: 'HOURLY'}
    });

    await Promise.all(hourly_subs.map(sub => {
      this.weatherQueue.add("weather-updates",{
        email: sub.email,
        city: sub.city,
        token: sub.confirmation_token
      }, {removeOnComplete: true, removeOnFail: false});
    }));
  }

  @Cron('0 9 * * *') // 09:00
  async dailyUpdates(){
    this.logger.log("DAILY UPDATE");

    const daily_subs = await this.prisma.subscription.findMany({
      where: {is_confirmed: true, frequency: 'DAILY'}
    });

    await Promise.all(daily_subs.map(sub => {
      this.weatherQueue.add("weather-updates",{
        email: sub.email,
        city: sub.city,
        token: sub.confirmation_token
      }, {removeOnComplete: true, removeOnFail: false});
    }));
  }
}
