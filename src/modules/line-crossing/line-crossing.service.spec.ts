import { Test, TestingModule } from '@nestjs/testing';
import { LineCrossingService } from './line-crossing.service.js';
import { LineInOutBasementService } from '../line-in-out-basement/line-in-out-basement.service.js';
import { BasementService } from '../basement/basement.service.js';
import { IncrRedLineService } from '../incr-red-line/incr-red-line.service.js';
import { EventPool } from '../shared/events/EventPool.js';

describe('LineCrossingService', () => {
  let service: LineCrossingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LineCrossingService,
        { provide: LineInOutBasementService, useValue: {} },
        { provide: BasementService, useValue: {} },
        { provide: IncrRedLineService, useValue: {} },
        { provide: EventPool, useValue: { subscribe: vi.fn(), emit: vi.fn() } },
      ],
    }).compile();

    service = module.get<LineCrossingService>(LineCrossingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
