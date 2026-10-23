import { Direction } from "../../../../common/types/Direction.js";
import { LineId } from "../value-object/LineId.js";

const DIRECTIONS: ReadonlyArray<Direction> = ['in', 'out', 'both'];

export class Line {
    private readonly id: LineId;
    private name: string;
    private direction: Direction;
    private isActive: boolean;

    constructor(id: LineId, name: string, direction: Direction, isActive: boolean) {
        Line.assertDirection(direction);

        this.id = id;
        this.name = name;
        this.direction = direction;
        this.isActive = isActive;
    }

    public static isDirection(value: string): value is Direction {
        return (DIRECTIONS as ReadonlyArray<string>).includes(value);
    }

    private static assertDirection(value: string): asserts value is Direction {
        if (!Line.isDirection(value)) {
            throw new Error(`invalid direction: ${value}`);
        }
    }

    public getId(): LineId {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDirection(): Direction {
        return this.direction;
    }

    public getIsActive(): boolean {
        return this.isActive;
    }

    public edit(name: string, direction: Direction, isActive: boolean) {
        Line.assertDirection(direction);

        this.name = name;
        this.direction = direction;
        this.isActive = isActive;
    }

    public activate() {
        this.isActive = true;
    }

    public deactivate() {
        this.isActive = false;
    }

    public canCountIn(): boolean {
        return this.isActive && (this.direction === 'in' || this.direction === 'both');
    }

    public canCountOut(): boolean {
        return this.isActive && (this.direction === 'out' || this.direction === 'both');
    }
}