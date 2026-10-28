import { ILineInOutBasementRepository } from "../../../line-in-out-basement/domain/repositories/ILineInOutBasementRepository.js";
import { LineInOutBasementId } from "../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js";
import { IncrRedLine } from "../../domain/entities/IncrRedLine.js";
import { IIncrRedLineRepository } from "../../domain/repositories/IIncrRedLineRepository.js";
import { IncrRedLineId } from "../../domain/value-object/IncrRedLineId.js";
import { IRegisterIncrRedLineRequest } from "../dto/request/IRegisterIncrRedLineRequest.dto.js";
import { IRegisterIncrRedLineResponse } from "../dto/response/IRegisterIncrRedLineResponse.dto.js";

export class RegisterIncrRedLine {
    constructor(
        private readonly incrRedLineRepository: IIncrRedLineRepository,
        private readonly lineInOutBasementRepository: ILineInOutBasementRepository,
    ) {}

    async execute(input: IRegisterIncrRedLineRequest): Promise<IRegisterIncrRedLineResponse> {
        const lineInOutBasementId = LineInOutBasementId.of(input.lineInOutBasementId);

        const lineInOutBasement = await this.lineInOutBasementRepository.findById(lineInOutBasementId);
        if (!lineInOutBasement) {
            throw new Error("LineInOutBasement not found");
        }

        const incrRedLine = new IncrRedLine(
            IncrRedLineId.generate(),
            lineInOutBasementId,
            input.context,
            input.apply,
        );

        await this.incrRedLineRepository.save(incrRedLine);

        return {
            id: incrRedLine.getId(),
            lineInOutBasementId: incrRedLine.getLineInOutBasementId(),
            context: incrRedLine.getContext(),
            apply: incrRedLine.getApply(),
        };
    }
}
