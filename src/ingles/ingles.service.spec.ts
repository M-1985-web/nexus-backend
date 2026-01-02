import { Test, TestingModule } from '@nestjs/testing';
import { InglesService } from './ingles.service';

describe('InglesService', () => {
  let service: InglesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InglesService],
    }).compile();

    service = module.get<InglesService>(InglesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
