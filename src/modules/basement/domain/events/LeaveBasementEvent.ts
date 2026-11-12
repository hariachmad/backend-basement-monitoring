import { IEvent } from "../../../shared/events/IEvent.js";

export type PayloadLeavedBasementEvent = {
    eventId: string;
    basementId: string
    timestamp: Date
    dateKey: string
}

export class LeaveBasementEvent implements IEvent<"basement.leaved",PayloadLeavedBasementEvent> {
    name: "basement.leaved"; 
    constructor(public readonly payload: PayloadLeavedBasementEvent) {}
}