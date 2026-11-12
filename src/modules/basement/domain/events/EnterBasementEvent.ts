import { IEvent } from "../../../shared/events/IEvent.js";

export type PayloadEnterBasementEvent = {
    eventId: string;
    basementId: string
    timestamp: Date
    dateKey: string
}

export class EnterBasementEvent implements IEvent<"basement.entered",PayloadEnterBasementEvent> {
    readonly name: "basement.entered"; 
    constructor(public readonly payload: PayloadEnterBasementEvent) {}
}