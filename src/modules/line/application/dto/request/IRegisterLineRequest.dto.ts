import { Direction } from "../../../../../common/types/Direction.js";

export interface IRegisterLineRequest {
    name: string;
    direction: Direction;
    isActive?: boolean;
}
