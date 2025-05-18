import { Module } from '@nestjs/common';
import { SchedulerController } from './app.controller';
import { SchedulerService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { UpdatesProcessor } from './updates.processor';
import { PrismaModule } from 'shared/prisma/prisma.module';
import { EmailModule } from 'shared/email/email.module';
import { SharedWeatherModule } from 'shared/weather/weather.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.registerQueue({
      name: "weather-scheduler",
      connection: {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    EmailModule,
    SharedWeatherModule
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService, UpdatesProcessor],
})
export class SchedulerModule {}
