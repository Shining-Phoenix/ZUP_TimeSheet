import { Test, TestingModule } from '@nestjs/testing';
import { TypesOfTimeService } from './typesOfTime.service';

describe('TypesOfTimeService', () => {
  let service: TypesOfTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypesOfTimeService],
    }).compile();

    service = module.get<TypesOfTimeService>(TypesOfTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
