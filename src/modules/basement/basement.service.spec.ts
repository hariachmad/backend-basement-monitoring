import { Test, TestingModule } from '@nestjs/testing';
import { BasementService } from './basement.service.js';
import { BASEMENT_REPOSITORY } from './basement.tokens.js';
import { EventPool } from '../shared/events/EventPool.js';

describe('BasementService', () => {
  let service: BasementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasementService,
        { provide: BASEMENT_REPOSITORY, useValue: {} },
        { provide: EventPool, useValue: {} },
      ],
    }).compile();

    service = module.get<BasementService>(BasementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
