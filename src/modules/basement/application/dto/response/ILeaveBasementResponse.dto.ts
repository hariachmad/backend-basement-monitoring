import { BasementId } from "../../../domain/value-object/BasementId.js";

export interface ILeaveBasementResponse {
    id: BasementId;
    name: string;
    capacity: number;
    currentCount: number;
    available: number;
    isFull: boolean;
    updatedAt: Date;
}