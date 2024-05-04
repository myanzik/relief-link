import { Test, TestingModule } from '@nestjs/testing';
import { DisasterService } from './disaster.service';

describe('DisasterService', () => {
  let service: DisasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisasterService],
    }).compile();

    service = module.get<DisasterService>(DisasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
