import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StoredEvent } from "../shared/infrastructure/database/persistence/mongodb/schema/stored-event.schema.js";
import { IEvent } from "../shared/events/IEvent.js";
import { deserialize, serialize } from "../shared/events/event-registry.js";

function isDuplicateKey(err: any): boolean {
  return (
    err?.code === 11000 ||
    err?.writeErrors?.some((w: any) => (w.code ?? w.err?.code) === 11000)
  );
}

@Injectable()
export class EventStoreService {
  constructor(
    @InjectModel(StoredEvent.name) private readonly model: Model<StoredEvent>,
  ) {}

  async load(aggregateId: string): Promise<IEvent[]> {
    const docs = await this.model
      .find({ aggregateId })
      .sort({ version: 1 })
      .lean<StoredEvent[]>();
    return docs.map(deserialize);
  }

  async append(
    expectedVersion: number,
    events: IEvent[],
    metadata?: Record<string, any>,
  ) {
    const docs = events.map((e, i) =>
      serialize(e, expectedVersion + i + 1, metadata),
    );
    try {
      await this.model.insertMany(docs, { ordered: true });
    } catch (err) {
      if (isDuplicateKey(err)) throw new ConflictException("Concurrency conflict");
      throw err;
    }
  }
}