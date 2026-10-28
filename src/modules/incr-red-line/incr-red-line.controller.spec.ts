import { Test, TestingModule } from '@nestjs/testing';
import { IncrRedLineController } from './incr-red-line.controller.js';
import { IncrRedLineService } from './incr-red-line.service.js';
import { INCR_RED_LINE_REPOSITORY } from './incr-red-line.tokens.js';
import { LINE_IN_OUT_BASEMENT_REPOSITORY } from '../line-in-out-basement/line-in-out-basement.tokens.js';

describe('IncrRedLineController', () => {
  let controller: IncrRedLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncrRedLineController],
      providers: [
        IncrRedLineService,
        { provide: INCR_RED_LINE_REPOSITORY, useValue: {} },
        { provide: LINE_IN_OUT_BASEMENT_REPOSITORY, useValue: {} },
      ],
    }).compile();

    controller = module.get<IncrRedLineController>(IncrRedLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
