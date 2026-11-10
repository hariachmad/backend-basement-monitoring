import { IEvent } from "../../../shared/events/IEvent.js";
import { BasementCountChangedreason } from "../../../shared/types/BasementCountChangedReason.js";
import { BasementId } from "../value-object/BasementId.js";

export type PayloadBasementCountChangedEvent = {
    basementId: BasementId;
    previousCount: number;
    currentCount: number;
    reason: BasementCountChangedreason;
    occurredAt: Date;
}

export class  BasementCountChangedEvent implements IEvent<"basement.count-changed",PayloadBasementCountChangedEvent> {
    readonly name: "basement.count-changed";
    constructor(public readonly payload: PayloadBasementCountChangedEvent) {}
}