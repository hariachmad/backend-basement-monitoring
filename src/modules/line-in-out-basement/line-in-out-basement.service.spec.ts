import { Test, TestingModule } from '@nestjs/testing';
import { LineInOutBasementService } from './line-in-out-basement.service.js';
import { LINE_IN_OUT_BASEMENT_REPOSITORY } from './line-in-out-basement.tokens.js';
import { LINE_REPOSITORY } from '../line/line.tokens.js';
import { BASEMENT_REPOSITORY } from '../basement/basement.tokens.js';

describe('LineInOutBasementService', () => {
  let service: LineInOutBasementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LineInOutBasementService,
        { provide: LINE_IN_OUT_BASEMENT_REPOSITORY, useValue: {} },
        { provide: LINE_REPOSITORY, useValue: {} },
        { provide: BASEMENT_REPOSITORY, useValue: {} },
      ],
    }).compile();

    service = module.get<LineInOutBasementService>(LineInOutBasementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
