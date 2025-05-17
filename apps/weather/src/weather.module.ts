import { Module } from '@nestjs/common';
import { AppController } from './weather.controller';
import { AppService } from './weather.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
