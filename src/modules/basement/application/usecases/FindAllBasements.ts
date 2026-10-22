import type { Basement } from "../../domain/entities/Basement.js";
import { IBasementRepository } from "../../domain/repositories/IBasementRepository.js";
import { IFindBasementResponse } from "../dto/response/IFindBasementResponse.dto.js";

export class FindAllBasements {
    constructor(private readonly basementRepository: IBasementRepository) { }

    async execute(): Promise<IFindBasementResponse[]> {

        const basements: Array<Basement> = await this.basementRepository.findAll();
        const findBasementResponses: IFindBasementResponse[] =
            basements.map((basement) => ({
                id: basement.getId(),
                name: basement.getName(),
                capacity: basement.getCapacity(),
                currentCount: basement.getCurrentCount(),
                available: basement.available,
                isFull: basement.isFull,
                updatedAt: basement.getUpdatedAt(),
            }));

        return findBasementResponses;
    }
}