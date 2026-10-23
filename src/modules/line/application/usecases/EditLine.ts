import { Line } from "../../domain/entities/Line.js";
import { ILineRepository } from "../../domain/repositories/ILineRepository.js";
import { LineId } from "../../domain/value-object/LineId.js";
import { IEditLineRequest } from "../dto/request/IEditLineRequest.dto.js";

export class EditLine {
    constructor(private readonly lineRepository: ILineRepository) { }

    async execute(input: IEditLineRequest): Promise<void> {
        const line = await this.lineRepository.findById(LineId.of(input.id));
        if (!line) {
            throw new Error("Line not found");
        }

        const sameName: Line | null = await this.lineRepository.findByName(input.name);
        if (sameName && sameName.getId().getValue() !== line.getId().getValue()) {
            throw new Error("line name already exists");
        }

        line.edit(input.name, input.direction, input.isActive);
        await this.lineRepository.save(line);
    }
}
