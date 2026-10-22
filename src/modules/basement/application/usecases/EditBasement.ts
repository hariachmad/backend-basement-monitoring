import { Basement } from "../../domain/entities/Basement.js";
import { IBasementRepository } from "../../domain/repositories/IBasementRepository.js";
import { BasementId } from "../../domain/value-object/BasementId.js";
import { IEditBasementRequest } from "../dto/request/IEditBasementRequest.dto.js";

export class EditBasement {
    constructor(private readonly basementRepository: IBasementRepository) { }

    async execute(input: IEditBasementRequest): Promise<void> {
        const basement = await this.basementRepository.findById(
            new BasementId(input.id),
        );
        if (!basement) {
            throw new Error("Basement not found");
        }

        const sameName : Basement | null = await this.basementRepository.findByName(input.name);
        if (sameName && sameName.getId().getValue() !== input.id) {
            throw new Error("basement name already exists");
        }

        basement.edit(input.name, input.capacity);        
        await this.basementRepository.save(basement); 
    }
}