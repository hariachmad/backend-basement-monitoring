import { BasementCountChangedreason } from "../../../shared/types/BasementCountChangedReason.js";
import { BasementId } from "../value-object/BasementId.js";

export interface BasementCountChangedEvent {
    readonly name: "basement.count-changed";
    readonly payload: {
        basementId: BasementId;
        previousCount: number;
        currentCount: number;
        reason: BasementCountChangedreason;
        occurredAt: Date;
    }
}