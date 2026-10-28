import { ILineInOutBasementRepository } from "../../../line-in-out-basement/domain/repositories/ILineInOutBasementRepository.js";
import { LineInOutBasementId } from "../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js";
import { IIncrRedLineRepository } from "../../domain/repositories/IIncrRedLineRepository.js";
import { IncrRedLineId } from "../../domain/value-object/IncrRedLineId.js";
import { IEditIncrRedLineRequest } from "../dto/request/IEditIncrRedLineRequest.dto.js";

export class EditIncrRedLine {
    constructor(
        private readonly incrRedLineRepository: IIncrRedLineRepository,
        private readonly lineInOutBasementRepository: ILineInOutBasementRepository,
    ) {}

    async execute(input: IEditIncrRedLineRequest): Promise<void> {
        const id = IncrRedLineId.of(input.id);
        const incrRedLine = await this.incrRedLineRepository.findById(id);
        if (!incrRedLine) {
            throw new Error("IncrRedLine not found");
        }

        const lineInOutBasementId = LineInOutBasementId.of(input.lineInOutBasementId);
        const lineInOutBasement = await this.lineInOutBasementRepository.findById(lineInOutBasementId);
        if (!lineInOutBasement) {
            throw new Error("LineInOutBasement not found");
        }

        incrRedLine.edit(lineInOutBasementId, input.context, input.apply);
        await this.incrRedLineRepository.save(incrRedLine);
    }
}
