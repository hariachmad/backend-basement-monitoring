import { BasementId } from "../../../domain/value-object/BasementId.js";

export interface IFindBasementRequest {
    id: BasementId | null;
    name?: string;
}