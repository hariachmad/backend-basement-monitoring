import { IBasementRepository } from "../../../basement/domain/repositories/IBasementRepository.js";
import { BasementId } from "../../../basement/domain/value-object/BasementId.js";
import { ILineRepository } from "../../../line/domain/repositories/ILineRepository.js";
import { LineId } from "../../../line/domain/value-object/LineId.js";
import { LineInOutBasement } from "../../domain/entities/LineInOutBasement.js";
import { ILineInOutBasementRepository } from "../../domain/repositories/ILineInOutBasementRepository.js";
import { LineInOutBasementId } from "../../domain/value-object/LineInOutBasementId.js";
import { IRegisterLineInOutBasementRequest } from "../dto/request/IRegisterLineInOutBasementRequest.dto.js";
import { IRegisterLineInOutBasementResponse } from "../dto/response/IRegisterLineInOutBasementResponse.dto.js";

export class RegisterLineInOutBasement {
    constructor(
        private readonly lineInOutBasementRepository: ILineInOutBasementRepository,
        private readonly lineRepository: ILineRepository,
        private readonly basementRepository: IBasementRepository,
    ) {}

    async execute(input: IRegisterLineInOutBasementRequest): Promise<IRegisterLineInOutBasementResponse> {
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

        const existing = await this.lineInOutBasementRepository.findByLineId(lineId);
        if (existing) {
            throw new Error("line already mapped to basement");
        }

        const lineInOutBasement = new LineInOutBasement(
            LineInOutBasementId.generate(),
            lineId,
            inToBasement,
            outToBasement,
        );

        await this.lineInOutBasementRepository.save(lineInOutBasement);

        return {
            id: lineInOutBasement.getId(),
            lineId: lineInOutBasement.getLineId(),
            inToBasementId: lineInOutBasement.inToBasement,
            outToBasementId: lineInOutBasement.getOutToBasement(),
        };
    }
}
