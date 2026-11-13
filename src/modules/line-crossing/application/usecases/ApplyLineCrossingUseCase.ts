// features/line-crossing/application/ApplyLineCrossingUseCase.ts
import { IFindBasementResponse } from "../../../basement/application/dto/response/IFindBasementResponse.dto.js";
import { BasementService } from "../../../basement/basement.service.js";
import { IncrRedLineService } from "../../../incr-red-line/incr-red-line.service.js";
import { IFindLineInOutBasementResponse } from "../../../line-in-out-basement/application/dto/response/IFindLineInOutBasementResponse.dto.js";
import { LineInOutBasementService } from "../../../line-in-out-basement/line-in-out-basement.service.js";
import type { EventPool } from "../../../shared/events/EventPool.js";
import { ApplyLineCrossingRequest } from "../dto/request/ApplyLineCrossingRequest.js";

export class ApplyLineCrossingUseCase {
    constructor(
        private readonly lineInOutService: LineInOutBasementService,
        private readonly basementService: BasementService,
        private readonly incrRedLineService: IncrRedLineService,
        private readonly eventBus: EventPool,
    ) { }

    public async execute(input: ApplyLineCrossingRequest): Promise<void> {
        const lineInOutBasements: IFindLineInOutBasementResponse[] =
            await this.lineInOutService.findByLineId({
                lineId: input.lineId,
            });
        
        console.log(`[ApplyLineCrossing] lineInOutBasements: ${JSON.stringify(lineInOutBasements)}`);

        if (!lineInOutBasements || lineInOutBasements.length === 0) {
            console.warn(`[ApplyLineCrossing] line ${String(input.lineId.getValue())} not found`);
            return;
        }

        const isIn = input.direction === 'in';
        const isOut = input.direction === 'out';

        for (const lineInOutBasement of lineInOutBasements) {
            const [inToBasement, outToBasement]: [IFindBasementResponse | null, IFindBasementResponse | null] =
                await Promise.all([
                    this.basementService.find({ id: lineInOutBasement.inToBasement }),
                    this.basementService.find({ id: lineInOutBasement.outToBasement }),
                ]);
            
            const contexts = await this.incrRedLineService.findByLineInOutId({
                lineInOutBasementId: lineInOutBasement.id,
            });

            for (const context of contexts) {
                if (context.context.toLowerCase() == input.direction) {
                    console.log(`[ApplyLineCrossing] apply ${context.apply} for lineInOutBasement ${String(lineInOutBasement.id)}`);
                    let basementContext;
                    if (isIn) {
                        basementContext = inToBasement;
                    }
                    if (isOut) {
                        basementContext = outToBasement;
                    }

                    if (!basementContext) {
                        console.warn(
                            `[ApplyLineCrossing] basement not found for lineInOutBasement ${String(lineInOutBasement.id)}`,
                        );
                        continue;
                    }

                    if (context.apply === 'INCREMENT') {
                        await this.basementService.enter({
                            basementId: basementContext.id,
                        })
                    }

                    if (context.apply === 'REDUCE') {
                        await this.basementService.leave({
                            basementId: basementContext.id,
                        })
                    }

                }
            }
        }
    }
}