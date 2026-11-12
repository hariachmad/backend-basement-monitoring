import { EnterBasementEvent } from "../../basement/domain/events/EnterBasementEvent.js";
import { LeaveBasementEvent } from "../../basement/domain/events/LeaveBasementEvent.js";
import { StoredEvent } from "../infrastructure/database/persistence/mongodb/schema/stored-event.schema.js";
import { IEvent } from "./IEvent.js";

type Def = {
    aggregateType: string;
    aggregateId: (p: any) => string;
    occurredAt: (p: any) => Date;
    create: (p: any) => IEvent;
};

const registry: Record<string, Def> = {
    "basement.entered": {
        aggregateType: "Basement",
        aggregateId: (p: any) => p.basementId,
        occurredAt: (p: any) => p.timestamp,
        create: (p: any) => new EnterBasementEvent(p),
    },
    "basement.exited": {
        aggregateType: "Basement",
        aggregateId: (p) => p.basementId,
        occurredAt: (p) => p.timestamp,
        create: (p) => new LeaveBasementEvent(p),
    },
};

export function serialize(
    event: IEvent,
    version: number,
    metadata?: Record<string, any>
) {
    const def = registry[event.name];
    if (!def) throw new Error(`Event not registered: ${event.name}`);
    return {
        aggregateId: def.aggregateId(event.payload),
        aggregateType: def.aggregateType,
        version,
        type: event.name,
        data: event.payload as Record<string, any>,
        metadata,
        occurredAt: def.occurredAt(event.payload),
    };
}

export function deserialize(doc: StoredEvent): IEvent {
  const def = registry[doc.type];
  if (!def) throw new Error(`Event tidak terdaftar: ${doc.type}`);
  return def.create(doc.data); // timestamp sudah berupa Date dari BSON
}

