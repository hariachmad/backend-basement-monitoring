import type { Basement as BasementRow } from "../../../../../generated/prisma/client.js";
import { Basement } from "../../../../basement/domain/entities/Basement.js";
import { BasementId } from "../../../../basement/domain/value-object/BasementId.js";

export class BasementMapper {
    static toDomain(row: BasementRow): Basement {
        return new Basement(
            new BasementId(row.id),
            row.name,
            row.capacity,
        );
    }

    static toPersistence(basement: Basement): BasementRow {
        return {
            id: basement.getId().getValue(),
            name: basement.getName(),
            capacity: basement.getCapacity(),
            currentCount: basement.getCurrentCount(),
            updatedAt: basement.getUpdatedAt(),
        };
    }
}