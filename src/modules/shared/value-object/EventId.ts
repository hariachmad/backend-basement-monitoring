import { randomUUID } from "crypto";
import { validate as isUUID } from 'uuid';

export class EventId {
    private value: string

    constructor(value: string) {
        this.value = value;
    }

    static of(value: string): EventId {
        if (!isUUID(value)) {
            throw new Error(`Invalid UUID: ${value}`);
        }
        return new EventId(value.toLowerCase());
    }

    static generate(): EventId {
        return new EventId(randomUUID());
    }

    getValue(): string {
        return this.value;
    }
}