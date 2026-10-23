import { Test, TestingModule } from '@nestjs/testing';
import { LineInOutBasementController } from './line-in-out-basement.controller.js';
import { LineInOutBasementService } from './line-in-out-basement.service.js';
import { LINE_IN_OUT_BASEMENT_REPOSITORY } from './line-in-out-basement.tokens.js';
import { LINE_REPOSITORY } from '../line/line.tokens.js';
import { BASEMENT_REPOSITORY } from '../basement/basement.tokens.js';

describe('LineInOutBasementController', () => {
  let controller: LineInOutBasementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LineInOutBasementController],
      providers: [
        LineInOutBasementService,
        { provide: LINE_IN_OUT_BASEMENT_REPOSITORY, useValue: {} },
        { provide: LINE_REPOSITORY, useValue: {} },
        { provide: BASEMENT_REPOSITORY, useValue: {} },
      ],
    }).compile();

    controller = module.get<LineInOutBasementController>(LineInOutBasementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
