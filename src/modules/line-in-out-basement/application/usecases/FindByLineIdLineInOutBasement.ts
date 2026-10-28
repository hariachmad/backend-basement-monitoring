import type { LineInOutBasement } from "../../domain/entities/LineInOutBasement.js";
import { ILineInOutBasementRepository } from "../../domain/repositories/ILineInOutBasementRepository.js";
import { IFindbByLineIdLineInOutBasementRequest } from "../dto/request/IFindByIdLineLineInOutBasementRequest.js";
import { IFindLineInOutBasementResponse } from "../dto/response/IFindLineInOutBasementResponse.dto.js";

export class FindByLineIdLineInOutBasement {
    constructor(private readonly lineInOutBasementRepository: ILineInOutBasementRepository) { }

    async execute(input: IFindbByLineIdLineInOutBasementRequest): Promise<IFindLineInOutBasementResponse[]> {

        let lineInOutBasements: LineInOutBasement[] | null;

        lineInOutBasements = await this.lineInOutBasementRepository.findByLineId(input.lineId);

        if (!lineInOutBasements) {
            throw new Error("LineInOutBasements not found");
        }

        return lineInOutBasements.map((item) => ({
            id: item.getId(),
            name: item.getName(),
            lineId: item.getLineId(),
            inToBasement: item.getInToBasement(),
            outToBasement: item.getOutToBasement(),
        }));
    }
}
