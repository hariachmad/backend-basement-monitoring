import { IBasementRepository } from "../../domain/repositories/IBasementRepository.js";
import { BasementId } from "../../domain/value-object/BasementId.js";
import { IDeleteBasementRequest } from "../dto/request/IDeleteBasementRequest.dto.js";

export class DeleteBasement {
    constructor(private readonly basementRepository: IBasementRepository) { }

    async execute(input: IDeleteBasementRequest): Promise<void> {
        const basement = await this.basementRepository.findById(
            new BasementId(input.id),
        );
        if (!basement) {
            throw new Error("Basement not found");
        }

        await this.basementRepository.delete(BasementId.of(input.id)); 
    }
}