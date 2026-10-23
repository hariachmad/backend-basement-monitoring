import { BasementId } from "../value-object/BasementId.js";

export interface BasementEditedEvent {
    readonly name: "basement.edited";
    readonly payload: {
        readonly basementId: BasementId;
        readonly nameValue: string;
        readonly capacity: number;
        readonly occurredAt: Date;
    }
}