import type { IncrRedLine } from "../../domain/entities/IncrRedLine.js";
import { IIncrRedLineRepository } from "../../domain/repositories/IIncrRedLineRepository.js";
import { IFindIncrRedLineRequest } from "../dto/request/IFindIncrRedLineRequest.dto.js";
import { IFindIncrRedLineResponse } from "../dto/response/IFindIncrRedLineResponse.dto.js";

export class FindByLineInOutIdIncrRedLine {
    constructor(private readonly incrRedLineRepository: IIncrRedLineRepository) { }

    async execute(input: IFindIncrRedLineRequest): Promise<IFindIncrRedLineResponse[]> {
        if (input.id && input.lineInOutBasementId) {
            throw new Error("provide only one of id or lineInOutBasementId");
    }

        let incrRedLines: IncrRedLine[];
        incrRedLines = await this.incrRedLineRepository.findByLineInOutBasementId(input.lineInOutBasementId!);
        return incrRedLines.map((incrRedLine) => ({
            id: incrRedLine.getId(),
            lineInOutBasementId: incrRedLine.getLineInOutBasementId(),
            context: incrRedLine.getContext(),
            apply: incrRedLine.getApply(),
        }))
    }
}

