import { Test, TestingModule } from '@nestjs/testing';
import { PgPoolService } from './pg-pool.service';

describe('PgPoolService', () => {
  let service: PgPoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PgPoolService],
    }).compile();

    service = module.get<PgPoolService>(PgPoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
