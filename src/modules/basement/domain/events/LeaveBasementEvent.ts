import { IEvent } from "../../../shared/events/IEvent.js";

export type PayloadLeavedBasementEvent = {
    basementId: string
    timestamp: Date
}

export class LeaveBasementEvent implements IEvent<"basement.leaved",PayloadLeavedBasementEvent> {
    name: "basement.leaved"; 
    constructor(public readonly payload: PayloadLeavedBasementEvent) {}
}