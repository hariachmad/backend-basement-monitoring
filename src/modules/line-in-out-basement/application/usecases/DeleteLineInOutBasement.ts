import { LineInOutBasement } from "../../domain/entities/LineInOutBasement.js";
import { ILineInOutBasementRepository } from "../../domain/repositories/ILineInOutBasementRepository.js";
import { LineInOutBasementId } from "../../domain/value-object/LineInOutBasementId.js";
import { IDeleteLineInOutBasementRequest } from "../dto/request/IDeleteLineInOutBasementRequest.dto.js";
import { IDeleteLineInOutBasementResponse } from "../dto/response/IDeleteLineInOutBasementResponse.dto.js";

export class DeleteLineInOutBasement {
    constructor(private readonly lineInOutBasementRepository: ILineInOutBasementRepository) { }

    async execute(input: IDeleteLineInOutBasementRequest): Promise<IDeleteLineInOutBasementResponse> {
        const id = LineInOutBasementId.of(input.id);
        const lineInOutBasement : LineInOutBasement | null = await this.lineInOutBasementRepository.findById(id);
        if (!lineInOutBasement) {
            throw new Error("LineInOutBasement not found");
        }

        await this.lineInOutBasementRepository.delete(id);

        return {
            id: lineInOutBasement.getId().getValue(),
            lineId: lineInOutBasement.getLineId().getValue(),
        };
    }
}
