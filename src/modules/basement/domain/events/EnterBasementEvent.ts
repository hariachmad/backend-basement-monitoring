import { IEvent } from "../../../shared/events/IEvent.js";

export type PayloadEnterBasementEvent = {
    basementId: string
    timestamp: Date
}

export class EnterBasementEvent implements IEvent<"basement.entered",PayloadEnterBasementEvent> {
    readonly name: "basement.entered"; 
    constructor(public readonly payload: PayloadEnterBasementEvent) {}
}