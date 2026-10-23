import { Line } from "../entities/Line.js";
import { LineId } from "../value-object/LineId.js";

export interface ILineRepository {
    findById(id: LineId): Promise<Line | null>;
    findAll(): Promise<Line[]>;
    findByName(name: string): Promise<Line | null>;
    save(line: Line): Promise<void>;
    delete(id: LineId): Promise<void>;
}