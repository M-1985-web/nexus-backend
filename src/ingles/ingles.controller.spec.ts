import { Test, TestingModule } from '@nestjs/testing';
import { InglesController } from './ingles.controller';
import { InglesService } from './ingles.service';

describe('InglesController', () => {
  let controller: InglesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InglesController],
      providers: [InglesService],
    }).compile();

    controller = module.get<InglesController>(InglesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
