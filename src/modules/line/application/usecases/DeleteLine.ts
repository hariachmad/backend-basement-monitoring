import { ILineRepository } from "../../domain/repositories/ILineRepository.js";
import { LineId } from "../../domain/value-object/LineId.js";
import { IDeleteLineRequest } from "../dto/request/IDeleteLineRequest.dto.js";
import { IDeleteLineResponse } from "../dto/response/IDeleteLineResponse.dto.js";

export class DeleteLine {
    constructor(private readonly lineRepository: ILineRepository) { }

    async execute(input: IDeleteLineRequest): Promise<IDeleteLineResponse> {
        const lineId = LineId.of(input.id);
        const line = await this.lineRepository.findById(lineId);
        if (!line) {
            throw new Error("Line not found");
        }

        await this.lineRepository.delete(lineId);

        return {
            id: line.getId().getValue(),
            name: line.getName(),
        };
    }
}
