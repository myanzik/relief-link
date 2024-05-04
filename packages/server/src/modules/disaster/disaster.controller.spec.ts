import { Test, TestingModule } from '@nestjs/testing';
import { DisasterController } from './disaster.controller';

describe('DisasterController', () => {
  let controller: DisasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisasterController],
    }).compile();

    controller = module.get<DisasterController>(DisasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
