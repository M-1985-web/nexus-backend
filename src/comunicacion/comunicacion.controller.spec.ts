import { Test, TestingModule } from '@nestjs/testing';
import { ComunicacionController } from './comunicacion.controller';
import { ComunicacionService } from './comunicacion.service';

describe('ComunicacionController', () => {
  let controller: ComunicacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComunicacionController],
      providers: [ComunicacionService],
    }).compile();

    controller = module.get<ComunicacionController>(ComunicacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
