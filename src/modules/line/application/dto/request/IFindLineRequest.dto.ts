import { LineId } from "../../../domain/value-object/LineId.js";

export interface IFindLineRequest {
    id?: LineId;
    name?: string;
}
