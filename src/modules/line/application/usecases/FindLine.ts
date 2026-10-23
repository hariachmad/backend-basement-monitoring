import type { Line } from "../../domain/entities/Line.js";
import { ILineRepository } from "../../domain/repositories/ILineRepository.js";
import { IFindLineRequest } from "../dto/request/IFindLineRequest.dto.js";
import { IFindLineResponse } from "../dto/response/IFindLineResponse.dto.js";

export class FindLine {
    constructor(private readonly lineRepository: ILineRepository) {}

    async execute(input: IFindLineRequest): Promise<IFindLineResponse> {
        if (!input.id && !input.name) {
            throw new Error("either id or name is required");
        }
        if (input.id && input.name) {
            throw new Error("provide only one of id or name");
        }

        let line: Line | null;

        if (input.id) {
            line = await this.lineRepository.findById(input.id);
        } else {
            line = await this.lineRepository.findByName(input.name!);
        }

        if (!line) {
            throw new Error("Line not found");
        }

        return {
            id: line.getId(),
            name: line.getName(),
            direction: line.getDirection(),
            isActive: line.getIsActive(),
        };
    }
}
