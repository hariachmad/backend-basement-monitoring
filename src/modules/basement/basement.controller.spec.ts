import { Test, TestingModule } from '@nestjs/testing';
import { BasementController } from './basement.controller.js';
import { BasementService } from './basement.service.js';
import { BASEMENT_REPOSITORY } from './basement.tokens.js';
import { EventPool } from '../shared/events/EventPool.js';

describe('BasementController', () => {
  let controller: BasementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasementController],
      providers: [
        BasementService,
        { provide: BASEMENT_REPOSITORY, useValue: {} },
        { provide: EventPool, useValue: {} },
      ],
    }).compile();

    controller = module.get<BasementController>(BasementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
