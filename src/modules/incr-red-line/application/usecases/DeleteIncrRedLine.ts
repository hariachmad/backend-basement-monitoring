import { IncrRedLine } from "../../domain/entities/IncrRedLine.js";
import { IIncrRedLineRepository } from "../../domain/repositories/IIncrRedLineRepository.js";
import { IncrRedLineId } from "../../domain/value-object/IncrRedLineId.js";
import { IDeleteIncrRedLineRequest } from "../dto/request/IDeleteIncrRedLineRequest.dto.js";
import { IDeleteIncrRedLineResponse } from "../dto/response/IDeleteIncrRedLineResponse.dto.js";

export class DeleteIncrRedLine {
    constructor(private readonly incrRedLineRepository: IIncrRedLineRepository) {}

    async execute(input: IDeleteIncrRedLineRequest): Promise<IDeleteIncrRedLineResponse> {
        const id = IncrRedLineId.of(input.id);
        const incrRedLine: IncrRedLine | null = await this.incrRedLineRepository.findById(id);
        if (!incrRedLine) {
            throw new Error("IncrRedLine not found");
        }

        await this.incrRedLineRepository.delete(id);

        return {
            id: incrRedLine.getId().getValue(),
            lineInOutBasementId: incrRedLine.getLineInOutBasementId().getValue(),
        };
    }
}
