import { Test, TestingModule } from '@nestjs/testing';
import { LineController } from './line.controller.js';
import { LineService } from './line.service.js';
import { LINE_REPOSITORY } from './line.tokens.js';

describe('LineController', () => {
  let controller: LineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LineController],
      providers: [LineService, { provide: LINE_REPOSITORY, useValue: {} }],
    }).compile();

    controller = module.get<LineController>(LineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
