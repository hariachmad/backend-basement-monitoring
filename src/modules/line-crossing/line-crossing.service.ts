import { Injectable } from '@nestjs/common';
import { ApplyLineCrossingUseCase } from './application/usecases/ApplyLineCrossingUseCase.js';
import { LineInOutBasementService } from '../line-in-out-basement/line-in-out-basement.service.js';
import { BasementService } from '../basement/basement.service.js';
import { EventPool } from '../shared/events/EventPool.js';

@Injectable()
export class LineCrossingService {

    private readonly applyLineCrossing: ApplyLineCrossingUseCase;
    constructor(
        lineInOutService: LineInOutBasementService,
        basementService: BasementService,
        eventPool: EventPool,
    ) {
        this.applyLineCrossing = new ApplyLineCrossingUseCase(lineInOutService, basementService, eventPool);
    }

    apply(input: Parameters<ApplyLineCrossingUseCase['execute']>[0]) {
        return this.applyLineCrossing.execute(input);
    }
}
