import { Test, TestingModule } from '@nestjs/testing';
import { SubdivisionController } from './subdivision.controller';

describe('Subdivision Controller', () => {
  let controller: SubdivisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubdivisionController],
    }).compile();

    controller = module.get<SubdivisionController>(SubdivisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
