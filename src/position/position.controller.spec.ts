import { Test, TestingModule } from '@nestjs/testing';
import { PositionController } from './position.controller';

describe('Position Controller', () => {
  let controller: PositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PositionController],
    }).compile();

    controller = module.get<PositionController>(PositionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
