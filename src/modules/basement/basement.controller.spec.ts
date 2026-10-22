import { Test, TestingModule } from '@nestjs/testing';
import { BasementController } from './basement.controller.js';

describe('BasementController', () => {
  let controller: BasementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasementController],
    }).compile();

    controller = module.get<BasementController>(BasementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
