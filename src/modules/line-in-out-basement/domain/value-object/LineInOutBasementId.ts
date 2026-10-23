import { randomUUID } from "crypto";
import { validate as isUUID } from 'uuid';

export class LineInOutBasementId {
    private value: string

    constructor(value: string) {
        this.value = value;
    }

    static of(value: string): LineInOutBasementId {
        if (!isUUID(value)) {
            throw new Error(`Invalid UUID: ${value}`);
        }
        return new LineInOutBasementId(value.toLowerCase());
    }

    static generate(): LineInOutBasementId {
        return new LineInOutBasementId(randomUUID());
    }

    getValue(): string {
        return this.value;
    }
}