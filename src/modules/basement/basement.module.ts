import { Module } from '@nestjs/common';
import { BasementController } from './basement.controller.js';
import { BasementService } from './basement.service.js';
import { BASEMENT_REPOSITORY } from './basement.tokens.js';
import { PrismaBasementRepository } from './infrastructure/database/BasementRepositories.js';
import { prisma } from '../shared/infrastructure/database/prisma.js';
import { EventPool } from '../shared/events/EventPool.js';

@Module({
  controllers: [BasementController],
  providers: [ {
            provide: BASEMENT_REPOSITORY,
            useFactory: () => new PrismaBasementRepository(prisma),
        },BasementService, EventPool],
  exports : [BasementService],
})
export class BasementModule {}
