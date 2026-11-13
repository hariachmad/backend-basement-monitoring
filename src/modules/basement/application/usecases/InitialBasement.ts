import { IBasementRepository } from "../../domain/repositories/IBasementRepository.js";
import { BasementId } from "../../domain/value-object/BasementId.js";
import { IInitialBasementRequest } from "../dto/request/IInitialBasementRequest.dto.js";

export class InitialBasement {
    constructor(private readonly basementRepository: IBasementRepository) { }

    async execute(input: IInitialBasementRequest): Promise<void> {
        const basement = await this.basementRepository.findById(
            BasementId.of(input.id),
        );
        if (!basement) {
            throw new Error("Basement not found");
        }

        basement.initial(input.amount);        
        await this.basementRepository.save(basement); 
    }
}