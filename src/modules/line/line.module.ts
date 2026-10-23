import { Module } from '@nestjs/common';
import { LineController } from './line.controller.js';
import { LineService } from './line.service.js';
import { LINE_REPOSITORY } from './line.tokens.js';
import { PrismaLineRepository } from './infrastructure/database/LineRepositories.js';
import { prisma } from '../shared/infrastructure/database/prisma.js';

@Module({
  controllers: [LineController],
  providers: [ {
            provide: LINE_REPOSITORY,
            useFactory: () => new PrismaLineRepository(prisma),
        },LineService]
})
export class LineModule {}
