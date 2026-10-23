import { Direction } from "../../../../../common/types/Direction.js";

export interface IEditLineRequest {
    id: string;
    name: string;
    direction: Direction;
    isActive: boolean;
}
