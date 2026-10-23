// features/line-crossing/application/ApplyLineCrossingUseCase.ts
import { IFindBasementResponse } from "../../../basement/application/dto/response/IFindBasementResponse.dto.js";
import { BasementService } from "../../../basement/basement.service.js";
import { IFindLineInOutBasementResponse } from "../../../line-in-out-basement/application/dto/response/IFindLineInOutBasementResponse.dto.js";
import { LineInOutBasementService } from "../../../line-in-out-basement/line-in-out-basement.service.js";
import type { EventPool } from "../../../shared/events/EventPool.js";
import { ApplyLineCrossingRequest } from "../dto/request/ApplyLineCrossingRequest.js";

export class ApplyLineCrossingUseCase {
    constructor(
        private readonly lineInOutService: LineInOutBasementService,
        private readonly basementService: BasementService,
        private readonly eventBus: EventPool,
    ) {}

    public async execute(input: ApplyLineCrossingRequest): Promise<void> {
        const lineInOutBasement : IFindLineInOutBasementResponse = await this.lineInOutService.find({
            lineId : input.lineId,
        });
        if (!lineInOutBasement) {
            console.warn(`[ApplyLineCrossing] line ${String(input.lineId)} not found`);
            return;
        }

        const isIn = input.direction === 'in';
        const isOut = input.direction === 'out';
        const inToBasement : IFindBasementResponse  = await this.basementService.find({
            id : lineInOutBasement.inToBasement
        })
        const outToBasement : IFindBasementResponse = await this.basementService.find({
            id : lineInOutBasement.outToBasement
        });

        if (!inToBasement || !outToBasement) {
            console.warn(`[ApplyLineCrossing] basement not found`);
            return;
        }

        if(isIn){
            await this.basementService.enter({
                basementId : inToBasement.id,
            });
        }
        
        if(isOut){
            await this.basementService.leave({
                basementId : outToBasement.id,
            });
        }
    }
}