import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerController } from './app.controller';
import { SchedulerService } from './app.service';

describe('SchedulerController', () => {
  let schedulerController: SchedulerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SchedulerController],
      providers: [SchedulerService],
    }).compile();

    schedulerController = app.get<SchedulerController>(SchedulerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(schedulerController.getHello()).toBe('Hello World!');
    });
  });
});
