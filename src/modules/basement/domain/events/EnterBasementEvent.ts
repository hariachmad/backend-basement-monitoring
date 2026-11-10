import { BasementId } from "../value-object/BasementId.js";

export interface EnterBasementEvent{
    readonly basementId: BasementId;
}