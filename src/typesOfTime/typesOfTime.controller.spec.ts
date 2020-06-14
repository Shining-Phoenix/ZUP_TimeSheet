import { Test, TestingModule } from '@nestjs/testing';
import { TypesOfTimeController } from './typesOfTime.controller';

describe('TypesOfTime Controller', () => {
  let controller: TypesOfTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypesOfTimeController],
    }).compile();

    controller = module.get<TypesOfTimeController>(TypesOfTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
