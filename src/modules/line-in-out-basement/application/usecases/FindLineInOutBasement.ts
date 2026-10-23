import type { LineInOutBasement } from "../../domain/entities/LineInOutBasement.js";
import { ILineInOutBasementRepository } from "../../domain/repositories/ILineInOutBasementRepository.js";
import { IFindLineInOutBasementRequest } from "../dto/request/IFindLineInOutBasementRequest.dto.js";
import { IFindLineInOutBasementResponse } from "../dto/response/IFindLineInOutBasementResponse.dto.js";

export class FindLineInOutBasement {
    constructor(private readonly lineInOutBasementRepository: ILineInOutBasementRepository) {}

    async execute(input: IFindLineInOutBasementRequest): Promise<IFindLineInOutBasementResponse> {
        if (!input.id && !input.lineId) {
            throw new Error("either id or lineId is required");
        }
        if (input.id && input.lineId) {
            throw new Error("provide only one of id or lineId");
        }

        let lineInOutBasement: LineInOutBasement | null;

        if (input.id) {
            lineInOutBasement = await this.lineInOutBasementRepository.findById(input.id);
        } else {
            lineInOutBasement = await this.lineInOutBasementRepository.findByLineId(input.lineId!);
        }

        if (!lineInOutBasement) {
            throw new Error("LineInOutBasement not found");
        }

        return {
            id: lineInOutBasement.getId(),
            lineId: lineInOutBasement.getLineId(),
            inToBasement: lineInOutBasement.getInToBasement(),
            outToBasement: lineInOutBasement.getOutToBasement(),
        };
    }
}
