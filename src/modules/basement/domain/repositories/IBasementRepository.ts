import { Basement } from "../entities/Basement.js";
import { BasementId } from "../value-object/BasementId.js";

export interface IBasementRepository {
    findById(id: BasementId): Promise<Basement | null>;
    findAll(): Promise<Basement[]>;
    findByName(name : string): Promise<Basement | null>
    save(basement: Basement): Promise<void>;
    delete(id: BasementId): Promise<void>;
}