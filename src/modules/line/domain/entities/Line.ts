import { Direction } from "../../../../common/types/Direction.js";
import { LineId } from "../value-object/LineId.js";


export class Line {
    id: LineId;                    
    name: string;            
    direction: Direction;  
    isActive: boolean;

    constructor(id: LineId, name: string, direction: Direction, isActive: boolean) {
        this.id = id;
        this.name = name;
        this.direction = direction;
        this.isActive = isActive;
    }
}