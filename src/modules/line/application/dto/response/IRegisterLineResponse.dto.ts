import { Direction } from "../../../../../common/types/Direction.js";

export interface IRegisterLineResponse {
    id: string;
    name: string;
    direction: Direction;
    isActive: boolean;
}
