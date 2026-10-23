import { Test, TestingModule } from '@nestjs/testing';
import { LineCrossingService } from './line-crossing.service.js';

describe('LineCrossingService', () => {
  let service: LineCrossingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineCrossingService],
    }).compile();

    service = module.get<LineCrossingService>(LineCrossingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
