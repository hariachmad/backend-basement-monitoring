import { BasementId } from "../../../domain/value-object/BasementId.js";

export interface IInitialBasementRequest {
    id: BasementId;
    amount: number;
}