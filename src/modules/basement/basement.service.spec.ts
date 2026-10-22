import { Test, TestingModule } from '@nestjs/testing';
import { BasementService } from './basement.service.js';

describe('BasementService', () => {
  let service: BasementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasementService],
    }).compile();

    service = module.get<BasementService>(BasementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
