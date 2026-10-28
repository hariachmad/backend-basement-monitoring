import type { LineInOutBasement } from "../../domain/entities/LineInOutBasement.js";
import { ILineInOutBasementRepository } from "../../domain/repositories/ILineInOutBasementRepository.js";
import { IFindLineInOutBasementRequest } from "../dto/request/IFindLineInOutBasementRequest.dto.js";
import { IFindLineInOutBasementResponse } from "../dto/response/IFindLineInOutBasementResponse.dto.js";

export class FindLineInOutBasement {
    constructor(private readonly lineInOutBasementRepository: ILineInOutBasementRepository) { }

    async execute(input: IFindLineInOutBasementRequest): Promise<IFindLineInOutBasementResponse> {

        let lineInOutBasement: LineInOutBasement | null;

        lineInOutBasement = await this.lineInOutBasementRepository.findById(input.id);

        if (!lineInOutBasement) {
            throw new Error("LineInOutBasement not found");
        }

        return {
            id: lineInOutBasement.getId(),
            name: lineInOutBasement.getName(),
            lineId: lineInOutBasement.getLineId(),
            inToBasement: lineInOutBasement.getInToBasement(),
            outToBasement: lineInOutBasement.getOutToBasement(),
        };
    }
}
