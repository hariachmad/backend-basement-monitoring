import { IBasementRepository } from "../../../basement/domain/repositories/IBasementRepository.js";
import { BasementId } from "../../../basement/domain/value-object/BasementId.js";
import { ILineRepository } from "../../../line/domain/repositories/ILineRepository.js";
import { LineId } from "../../../line/domain/value-object/LineId.js";
import { ILineInOutBasementRepository } from "../../domain/repositories/ILineInOutBasementRepository.js";
import { LineInOutBasementId } from "../../domain/value-object/LineInOutBasementId.js";
import { IEditLineInOutBasementRequest } from "../dto/request/IEditLineInOutBasementRequest.dto.js";

export class EditLineInOutBasement {
    constructor(
        private readonly lineInOutBasementRepository: ILineInOutBasementRepository,
        private readonly lineRepository: ILineRepository,
        private readonly basementRepository: IBasementRepository,
    ) { }

    async execute(input: IEditLineInOutBasementRequest): Promise<void> {
        const lineInOutBasement = await this.lineInOutBasementRepository.findById(LineInOutBasementId.of(input.id));
        if (!lineInOutBasement) {
            throw new Error("LineInOutBasement not found");
        }

        const lineId = LineId.of(input.lineId);
        const inToBasement = BasementId.of(input.inToBasementId);
        const outToBasement = BasementId.of(input.outToBasementId);

        if (!(await this.lineRepository.findById(lineId))) {
            throw new Error("Line not found");
        }
        if (!(await this.basementRepository.findById(inToBasement))) {
            throw new Error("inToBasement not found");
        }
        if (!(await this.basementRepository.findById(outToBasement))) {
            throw new Error("outToBasement not found");
        }

        const sameLine = await this.lineInOutBasementRepository.findByLineId(lineId);
        if (sameLine && sameLine.getId().getValue() !== lineInOutBasement.getId().getValue()) {
            throw new Error("line already mapped to basement");
        }

        lineInOutBasement.edit(lineId, inToBasement, outToBasement);
        await this.lineInOutBasementRepository.save(lineInOutBasement);
    }
}
