import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'shared/prisma/prisma.service';
import { Queue } from 'bullmq';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectQueue("weather-sheduler") private weatherQueue: Queue,
    private readonly prisma: PrismaService) {}
  
  healthcheck(): string {
    return 'Hello!';
  }

  //TODO REPLACE WITH HOUR
  @Cron(CronExpression.EVERY_10_MINUTES)
  async hourlyUpdates(){ 
    this.logger.log("HOURLY UPDATE");
    
    const hourly_subs = await this.prisma.subscription.findMany({
      where: {is_confirmed: true, frequency: 'HOURLY'}
    });

    for (const sub of hourly_subs) {
      await this.weatherQueue.add("weather-updates",{
        email: sub.email,
        city: sub.city,
        token: sub.confirmation_token
      }, {removeOnComplete: true, removeOnFail: false});
    }
  }

  @Cron('0 9 * * *') // 09:00
  async dailyUpdates(){
    this.logger.log("DAILY UPDATE");

    const daily_subs = await this.prisma.subscription.findMany({
      where: {is_confirmed: true, frequency: 'DAILY'}
    });


    for (const sub of daily_subs) {
      await this.weatherQueue.add("weather-updates",{
        email: sub.email,
        city: sub.city,
        token: sub.confirmation_token
      }, {removeOnComplete: true, removeOnFail: false});
    }
  }
}
