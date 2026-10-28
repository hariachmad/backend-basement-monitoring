import type { IncrRedLine } from "../../domain/entities/IncrRedLine.js";
import { IIncrRedLineRepository } from "../../domain/repositories/IIncrRedLineRepository.js";
import { IFindIncrRedLineRequest } from "../dto/request/IFindIncrRedLineRequest.dto.js";
import { IFindIncrRedLineResponse } from "../dto/response/IFindIncrRedLineResponse.dto.js";

export class FindIncrRedLine {
    constructor(private readonly incrRedLineRepository: IIncrRedLineRepository) {}

    async execute(input: IFindIncrRedLineRequest): Promise<IFindIncrRedLineResponse> {
        if (!input.id) {
            throw new Error("either id or lineInOutBasementId is required");
        }

        let incrRedLine: IncrRedLine | null;
        incrRedLine = await this.incrRedLineRepository.findById(input.id);

        if (!incrRedLine) {
            throw new Error("IncrRedLine not found");
        }

        return {
            id: incrRedLine.getId(),
            lineInOutBasementId: incrRedLine.getLineInOutBasementId(),
            context: incrRedLine.getContext(),
            apply: incrRedLine.getApply(),
        };
    }
}
