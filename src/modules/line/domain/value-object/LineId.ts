import { randomUUID } from "crypto";
import { validate as isUUID } from 'uuid';

export class LineId{
    private value : string

    constructor(value : string){
        this.value = value;
    }

    static of(value : string) : LineId{
        if (!isUUID(value)) {
            throw new Error(`Invalid UUID: ${value}`);
        }
        return new LineId(value.toLowerCase());
    }

    static generate() : LineId{
        return new LineId(randomUUID());
    }

    getValue() : string{
        return this.value;
    }
}