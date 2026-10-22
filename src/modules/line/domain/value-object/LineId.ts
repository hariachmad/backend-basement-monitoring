import { randomUUID, UUID } from "crypto";

export class LineId{
    private value : UUID

    constructor(value : UUID){
        this.value = value;
    }

    static of(value : UUID) : LineId{
        return new LineId(value);
    }

    static generate() : LineId{
        return new LineId(randomUUID());
    }

    getValue() : UUID{
        return this.value;
    }
}