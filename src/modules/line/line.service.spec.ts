import { Test, TestingModule } from '@nestjs/testing';
import { LineService } from './line.service.js';
import { LINE_REPOSITORY } from './line.tokens.js';

describe('LineService', () => {
  let service: LineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineService, { provide: LINE_REPOSITORY, useValue: {} }],
    }).compile();

    service = module.get<LineService>(LineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
