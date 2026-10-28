import { Injectable } from "@nestjs/common";
import { EventHandler } from "../types/EventHandler.js";
import { EventMap } from "./EventMap.js";

@Injectable()
export class EventPool {
    private readonly handlers = new Map<keyof EventMap, Set<EventHandler<any>>>();
    private queue: Promise<void> = Promise.resolve();

    private readonly id = Math.random().toString(36).slice(2, 6);

    constructor() {
    console.log('[EventPool] created', this.id);
}

    public subscribe<K extends keyof EventMap>(
        type: K,
        handler: EventHandler<EventMap[K]>,
    ): () => void {
        console.log('[EventPool] subscribe', type, 'pool:', this.id);
        const set = this.handlers.get(type) ?? new Set();
        set.add(handler);
        this.handlers.set(type, set);
        return () => set.delete(handler);
    }

    public publish<K extends keyof EventMap>(
        type: K,
        payload: EventMap[K],
    ): Promise<void> {
        console.log('[EventPool] publish', type, 'pool:', this.id, 'handlers:', this.handlers.get(type)?.size ?? 0);
        this.queue = this.queue.then(() => this.dispatch(type, payload));
        return this.queue;
    }

    private async dispatch<K extends keyof EventMap>(
        type: K,
        payload: EventMap[K],
    ) {
        const set = this.handlers.get(type);
        if (!set) return;

        for (const handler of set) {
            try {
                await handler(payload);
            } catch (err) {
                console.error(`[EventPool] handler error on "${type}"`, err);
            }
        }
    }
}