import { Module } from '@nestjs/common';
import { IncrRedLineController } from './incr-red-line.controller.js';
import { IncrRedLineService } from './incr-red-line.service.js';
import { INCR_RED_LINE_REPOSITORY } from './incr-red-line.tokens.js';
import { PrismaIncrRedLineRepository } from './infrastructure/database/IncrRedLineRepositories.js';
import { LINE_IN_OUT_BASEMENT_REPOSITORY } from '../line-in-out-basement/line-in-out-basement.tokens.js';
import { PrismaLineInOutBasementRepository } from '../line-in-out-basement/infrastructure/database/LineInOutBasementRepositories.js';
import { prisma } from '../shared/infrastructure/database/prisma.js';

@Module({
  controllers: [IncrRedLineController],
  providers: [
    {
      provide: INCR_RED_LINE_REPOSITORY,
      useFactory: () => new PrismaIncrRedLineRepository(prisma),
    },
    {
      provide: LINE_IN_OUT_BASEMENT_REPOSITORY,
      useFactory: () => new PrismaLineInOutBasementRepository(prisma),
    },
    IncrRedLineService,
  ],
  exports: [IncrRedLineService],
})
export class IncrRedLineModule {}
