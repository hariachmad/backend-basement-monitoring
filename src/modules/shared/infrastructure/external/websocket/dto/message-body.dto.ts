import { UUID } from "crypto";
import { LineState } from "../../../../../../common/types/LineState.js";

export interface MessageBody {
    lineId : UUID
    state : LineState
}