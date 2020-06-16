import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeWorkplaceHistoryService } from './employeeWorkplaceHistory.service';

describe('EmployeeWorkplaceHistoryService', () => {
  let service: EmployeeWorkplaceHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeWorkplaceHistoryService],
    }).compile();

    service = module.get<EmployeeWorkplaceHistoryService>(EmployeeWorkplaceHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
