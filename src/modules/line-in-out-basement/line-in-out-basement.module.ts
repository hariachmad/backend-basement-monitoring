import { Module } from '@nestjs/common';
import { LineInOutBasementController } from './line-in-out-basement.controller.js';
import { LineInOutBasementService } from './line-in-out-basement.service.js';
import { LINE_IN_OUT_BASEMENT_REPOSITORY } from './line-in-out-basement.tokens.js';
import { PrismaLineInOutBasementRepository } from './infrastructure/database/LineInOutBasementRepositories.js';
import { LINE_REPOSITORY } from '../line/line.tokens.js';
import { PrismaLineRepository } from '../line/infrastructure/database/LineRepositories.js';
import { BASEMENT_REPOSITORY } from '../basement/basement.tokens.js';
import { PrismaBasementRepository } from '../basement/infrastructure/database/BasementRepositories.js';
import { prisma } from '../shared/infrastructure/database/prisma.js';

@Module({
  controllers: [LineInOutBasementController],
  providers: [
    {
      provide: LINE_IN_OUT_BASEMENT_REPOSITORY,
      useFactory: () => new PrismaLineInOutBasementRepository(prisma),
    },
    {
      provide: LINE_REPOSITORY,
      useFactory: () => new PrismaLineRepository(prisma),
    },
    {
      provide: BASEMENT_REPOSITORY,
      useFactory: () => new PrismaBasementRepository(prisma),
    },
    LineInOutBasementService,
  ],
   exports: [LineInOutBasementService],
})
export class LineInOutBasementModule {}
