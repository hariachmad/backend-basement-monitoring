import type { IncrRedLine } from "../../domain/entities/IncrRedLine.js";
import { IIncrRedLineRepository } from "../../domain/repositories/IIncrRedLineRepository.js";
import { IFindAllIncrRedLineFilter } from "../dto/request/IFindAllIncrRedLineFilter.js";
import { IFindIncrRedLineResponse } from "../dto/response/IFindIncrRedLineResponse.dto.js";

export class FindAllIncrRedLines {
    constructor(private readonly incrRedLineRepository: IIncrRedLineRepository) {}

    async execute(filter: IFindAllIncrRedLineFilter = {}): Promise<IFindIncrRedLineResponse[]> {
        const rows: Array<IncrRedLine> = await this.incrRedLineRepository.findAll(filter);
        return rows.map((item) => ({
            id: item.getId(),
            lineInOutBasementId: item.getLineInOutBasementId(),
            context: item.getContext(),
            apply: item.getApply(),
        }));
    }
}
