import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ApplyLineCrossingUseCase } from './application/usecases/ApplyLineCrossingUseCase.js';
import { LineInOutBasementService } from '../line-in-out-basement/line-in-out-basement.service.js';
import { BasementService } from '../basement/basement.service.js';
import { EventPool } from '../shared/events/EventPool.js';
import { IncrRedLineService } from '../incr-red-line/incr-red-line.service.js';

@Injectable()
export class LineCrossingService implements OnModuleInit, OnModuleDestroy {

    private readonly applyLineCrossing: ApplyLineCrossingUseCase;
    private unsubscribe?: () => void;
    constructor(
        lineInOutService: LineInOutBasementService,
        basementService: BasementService,
        incrRedLineService: IncrRedLineService,
        private readonly eventPool: EventPool,
    ) {
        this.applyLineCrossing = new ApplyLineCrossingUseCase(lineInOutService, basementService,incrRedLineService, eventPool);
    }

    onModuleInit(): void {
        this.unsubscribe = this.eventPool.subscribe('line.crossed', async (event) => {
            await this.applyLineCrossing.execute({
                lineId: event.lineId,
                direction: event.direction,
            });
        });
        console.log('[LineCrossingService] subscribed to line.crossed');
    }

    onModuleDestroy(): void {
        this.unsubscribe?.();
    }

    apply(input: Parameters<ApplyLineCrossingUseCase['execute']>[0]) {
        return this.applyLineCrossing.execute(input);
    }
}