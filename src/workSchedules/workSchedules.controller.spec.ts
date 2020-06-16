import { Test, TestingModule } from '@nestjs/testing';
import { WorkSchedulesController } from './workSchedules.controller';

describe('WorkSchedules Controller', () => {
  let controller: WorkSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkSchedulesController],
    }).compile();

    controller = module.get<WorkSchedulesController>(WorkSchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
