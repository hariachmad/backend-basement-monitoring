import { Direction } from "../../../../../common/types/Direction.js";

export interface IEditLineResponse {
    id: string;
    name: string;
    direction: Direction;
    isActive: boolean;
}
