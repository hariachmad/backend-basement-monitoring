import { BasementId } from "../../../domain/value-object/BasementId.js";

export interface IFindBasementRequest {
    id?: BasementId;
    name?: string;
}