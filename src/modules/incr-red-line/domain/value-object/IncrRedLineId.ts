import { randomUUID } from "crypto";
import { validate as isUUID } from 'uuid';

export class IncrRedLineId {
    private value: string

    constructor(value: string) {
        this.value = value;
    }

    static of(value: string): IncrRedLineId {
        if (!isUUID(value)) {
            throw new Error(`Invalid UUID: ${value}`);
        }
        return new IncrRedLineId(value.toLowerCase());
    }

    static generate(): IncrRedLineId {
        return new IncrRedLineId(randomUUID());
    }

    getValue(): string {
        return this.value;
    }
}