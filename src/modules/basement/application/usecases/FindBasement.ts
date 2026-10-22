import type { Basement } from "../../domain/entities/Basement.js";
import { IBasementRepository } from "../../domain/repositories/IBasementRepository.js";
import { IFindBasementRequest } from "../dto/request/IFindBasementRequest.dto.js";
import { IFindBasementResponse } from "../dto/response/IFindBasementResponse.dto.js";

export class FindBasement {
    constructor(private readonly basementRepository: IBasementRepository) {}

    async execute(input: IFindBasementRequest): Promise<IFindBasementResponse> {
        if (!input.id && !input.name) {
            throw new Error("either id or name is required");
        }
        if (input.id && input.name) {
            throw new Error("provide only one of id or name");
        }

        let basement: Basement | null;

        if (input.id) {
            basement = await this.basementRepository.findById(input.id);
        } else {
            basement = await this.basementRepository.findByName(input.name!);
        }

        if (!basement) {
            throw new Error("Basement not found");
        }

        return {
            id: basement.getId(),
            name: basement.getName(),
            capacity: basement.getCapacity(),
            currentCount: basement.getCurrentCount(),
            available: basement.available,
            isFull: basement.isFull,
            updatedAt: basement.getUpdatedAt(),
        };
    }
}