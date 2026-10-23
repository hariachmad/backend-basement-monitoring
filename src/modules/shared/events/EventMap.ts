import { Direction } from "../../../common/types/Direction.js";
import { BasementId } from "../../basement/domain/value-object/BasementId.js";
import { LineId } from "../../line/domain/value-object/LineId.js";
import { EventId } from "../value-object/EventId.js";

export interface EventMap {
    "line.crossed": {
        eventId: EventId;
        lineId: LineId;
        direction: Direction;
        occurredAt: Date;
    };
    "basement.updated": {
        basementId: BasementId;
        currentCount: number;
    };
    "basement.count-changed": {
        basementId: BasementId;
        previousCount: number;
        currentCount: number;
        reason: string;
        occurredAt: Date;
    };
    "basement.edited": {
        basementId: BasementId;
        nameValue: string;
        capacity: number;
        occurredAt: Date;
    };
}