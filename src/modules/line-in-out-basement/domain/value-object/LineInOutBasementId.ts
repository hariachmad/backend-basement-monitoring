
import { randomUUID, UUID } from "crypto";
export class LineInOutBasementId {
    private value: UUID

    constructor(value: UUID) {
        this.value = value;
    }

    static of(value: UUID): LineInOutBasementId {
        return new LineInOutBasementId(value);
    }

    static generate(): LineInOutBasementId {
        return new LineInOutBasementId(randomUUID());
    }
    getValue(): UUID {
        return this.value;
    }
}