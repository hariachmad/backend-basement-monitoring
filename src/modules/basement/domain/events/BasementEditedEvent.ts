import { IEvent } from "../../../shared/events/IEvent.js";
import { BasementId } from "../value-object/BasementId.js";

export type PayloadBasementEditedEvent = {
    readonly basementId: BasementId;
    readonly nameValue: string;
    readonly capacity: number;
    readonly occurredAt: Date;
}

export class BasementEditedEvent implements IEvent<"basement.edited",PayloadBasementEditedEvent> {
    readonly name: "basement.edited";
    constructor(public readonly payload: PayloadBasementEditedEvent) {}
}