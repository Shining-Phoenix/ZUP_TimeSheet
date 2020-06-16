import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeWorkplaceHistoryController } from './employeeWorkplaceHistory.controller';

describe('EmployeeWorkplaceHistory Controller', () => {
  let controller: EmployeeWorkplaceHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeWorkplaceHistoryController],
    }).compile();

    controller = module.get<EmployeeWorkplaceHistoryController>(EmployeeWorkplaceHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
