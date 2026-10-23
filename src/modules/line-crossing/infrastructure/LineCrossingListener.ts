import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { EventId } from "../../shared/value-object/EventId.js";
import { LineCrossedEvent } from "./types/LineCrossedEvent.js";
import { EventPool } from "../../shared/events/EventPool.js";
import { LineCrossingService } from "../line-crossing.service.js";

export class LineCrossingListener implements OnModuleInit, OnModuleDestroy{
    private unsubscribe?: () => void;
    
    private readonly processed = new Map<EventId, number>(); 
    private readonly ttlMs = 5 * 60 * 1000;

    constructor(
        private readonly eventPool: EventPool,
        private readonly lineCrossingService: LineCrossingService,
    ) {}

    onModuleInit() {
        this.unsubscribe = this.eventPool.subscribe('line.crossed', (event) =>
            this.handle(event),
        );
    }

    onModuleDestroy() {
        this.unsubscribe?.();
    }

    public async handle(event: LineCrossedEvent): Promise<void> {
        if (this.isDuplicate(event.eventId)) {
            console.warn(`[LineCrossingListener] duplicated eventId=${event.eventId}, skipped`);
            return;
        }

        try {
            await this.lineCrossingService.apply({
                lineId: event.lineId,
                direction: event.direction,
            });
        } catch (err) {
            this.processed.delete(event.eventId);
            console.error(
                `[LineCrossingListener] failed to handle eventId=${event.eventId}`,
                err,
            );
        }
    }

    private isDuplicate(eventId: EventId): boolean {
        const now = Date.now();

        for (const [id, ts] of this.processed) {
            if (now - ts > this.ttlMs) this.processed.delete(id);
        }

        if (this.processed.has(eventId)) return true;

        this.processed.set(eventId, now);
        return false;
    }
}