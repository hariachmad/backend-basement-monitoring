import type { LineInOutBasement } from "../../domain/entities/LineInOutBasement.js";
import { ILineInOutBasementRepository } from "../../domain/repositories/ILineInOutBasementRepository.js";
import { IFindLineInOutBasementFilter } from "../dto/request/IFindAllLineInOutBasementFilter.js";
import { IFindLineInOutBasementResponse } from "../dto/response/IFindLineInOutBasementResponse.dto.js";

export class FindAllLineInOutBasements {
    constructor(private readonly lineInOutBasementRepository: ILineInOutBasementRepository) { }

    async execute(
        filter: IFindLineInOutBasementFilter = {}
    ): Promise<IFindLineInOutBasementResponse[]> {

        const lineInOutBasements: Array<LineInOutBasement> = await this.lineInOutBasementRepository.findAll(filter);
        const responses: IFindLineInOutBasementResponse[] =
            lineInOutBasements.map((item) => ({
                id: item.getId(),
                lineId: item.getLineId(),
                inToBasement: item.getInToBasement(),
                outToBasement: item.getOutToBasement(),
            }));

        return responses;
    }
}