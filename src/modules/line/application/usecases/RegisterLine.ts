import { Line } from "../../domain/entities/Line.js";
import { ILineRepository } from "../../domain/repositories/ILineRepository.js";
import { LineId } from "../../domain/value-object/LineId.js";
import { IRegisterLineRequest } from "../dto/request/IRegisterLineRequest.dto.js";
import { IRegisterLineResponse } from "../dto/response/IRegisterLineResponse.dto.js";

export class RegisterLine {
    constructor(private readonly lineRepository: ILineRepository) {}

    async execute(input: IRegisterLineRequest): Promise<IRegisterLineResponse> {
        const existing = await this.lineRepository.findByName(input.name);
        if (existing) {
            throw new Error("line name already exists");
        }

        const line = new Line(
            LineId.generate(),
            input.name,
            input.direction,
            input.isActive ?? true,
        );

        await this.lineRepository.save(line);

        return {
            id: line.getId().getValue(),
            name: line.getName(),
            direction: line.getDirection(),
            isActive: line.getIsActive(),
        };
    }
}
