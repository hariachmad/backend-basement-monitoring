import { randomUUID, UUID } from "crypto";
import { validate as isUUID } from 'uuid';

export class BasementId{
    private value : string

    constructor(value : string ){
        this.value = value;
    }

    static of(value: string): BasementId {
    if (!isUUID(value)) {
      throw new Error(`Invalid UUID: ${value}`);
    }
    return new BasementId(value.toLowerCase());
  }


    static generate() : BasementId{
        return new BasementId(randomUUID());
    }

    getValue() : string{
        return this.value;
    }
}