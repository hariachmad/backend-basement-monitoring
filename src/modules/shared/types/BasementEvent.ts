import { BasementCountChangedEvent } from "../../basement/domain/events/BasementCountChangedEvent.js";
import { BasementEditedEvent } from "../../basement/domain/events/BasementEditedEvent.js";

export type BasementEvent = BasementCountChangedEvent | BasementEditedEvent;