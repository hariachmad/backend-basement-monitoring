import type { Line } from "../../domain/entities/Line.js";
import { ILineRepository } from "../../domain/repositories/ILineRepository.js";
import { IFindLineResponse } from "../dto/response/IFindLineResponse.dto.js";

export class FindAllLines {
    constructor(private readonly lineRepository: ILineRepository) { }

    async execute(): Promise<IFindLineResponse[]> {

        const lines: Array<Line> = await this.lineRepository.findAll();
        const findLineResponses: IFindLineResponse[] =
            lines.map((line) => ({
                id: line.getId(),
                name: line.getName(),
                direction: line.getDirection(),
                isActive: line.getIsActive(),
            }));

        return findLineResponses;
    }
}
