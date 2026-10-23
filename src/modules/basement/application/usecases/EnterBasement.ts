import { EventPool } from "../../../shared/events/EventPool.js";
import { Basement } from "../../domain/entities/Basement.js";
import { IBasementRepository } from "../../domain/repositories/IBasementRepository.js";
import { IEnterBasementRequest } from "../dto/request/IEnterBasementRequest.dto.js";
import { IEnterBasementResponse } from "../dto/response/IEnterBasementResponse.dto.js";

export class EnterBasement {
    constructor(private readonly basementRepository: IBasementRepository
        , private readonly eventPool : EventPool
    ) { }

    async execute(input: IEnterBasementRequest): Promise<IEnterBasementResponse> {
        const basement: Basement | null = await this.basementRepository.findById(input.basementId);
        if (!basement) {
            throw new Error("Basement not found");
        }
        basement.registerIn();
        await this.basementRepository.save(basement);

        for (const event of basement.pullEvents()) {
            void this.eventPool.publish(event.name, );
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