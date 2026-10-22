import { Basement } from "../../domain/entities/Basement.js";
import { IBasementRepository } from "../../domain/repositories/IBasementRepository.js";
import { BasementId } from "../../domain/value-object/BasementId.js";
import { IRegisterBasementRequest } from "../dto/request/IRegisterBasementRequest.dto.js";
import { IRegisterBasementResponse } from "../dto/response/IRegisterBasementResponse.dto.js";

export class RegisterBasement {
    constructor(private readonly basementRepository: IBasementRepository) {}

    async execute(input: IRegisterBasementRequest): Promise<IRegisterBasementResponse> {
        const existing = await this.basementRepository.findByName(input.name);
        if (existing) {
            throw new Error("basement name already exists");
        }

        const basement = new Basement(
            BasementId.generate(),
            input.name,
            input.capacity,
        );

        await this.basementRepository.save(basement);

        return {
            id: basement.getId().getValue(),
            name: basement.getName(),
            capacity: basement.getCapacity(),
            currentCount: basement.getCurrentCount(),
        };
    }
}