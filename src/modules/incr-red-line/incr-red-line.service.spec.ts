import { Test, TestingModule } from '@nestjs/testing';
import { IncrRedLineService } from './incr-red-line.service.js';
import { INCR_RED_LINE_REPOSITORY } from './incr-red-line.tokens.js';
import { LINE_IN_OUT_BASEMENT_REPOSITORY } from '../line-in-out-basement/line-in-out-basement.tokens.js';

describe('IncrRedLineService', () => {
  let service: IncrRedLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncrRedLineService,
        { provide: INCR_RED_LINE_REPOSITORY, useValue: {} },
        { provide: LINE_IN_OUT_BASEMENT_REPOSITORY, useValue: {} },
      ],
    }).compile();

    service = module.get<IncrRedLineService>(IncrRedLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
