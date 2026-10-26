import { EventPool } from "../../../shared/events/EventPool.js";
import { Basement } from "../../domain/entities/Basement.js";
import { IBasementRepository } from "../../domain/repositories/IBasementRepository.js";
import { ILeaveBasementRequest } from "../dto/request/ILeaveBasementRequest.dto.js";
import { ILeaveBasementResponse } from "../dto/response/ILeaveBasementResponse.dto.js";

export class LeaveBasement {
    constructor(private readonly basementRepository: IBasementRepository, private readonly eventPool : EventPool) { }

    async execute(input: ILeaveBasementRequest): Promise<ILeaveBasementResponse> {
        const basement: Basement | null = await this.basementRepository.findById(input.basementId);
        if (!basement) {
            throw new Error("Basement not found");
        }
        basement.registerOut;
        await this.basementRepository.save(basement);

        for (const event of basement.pullEvents()) {
            void this.eventPool.publish(event.name, event.payload);
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