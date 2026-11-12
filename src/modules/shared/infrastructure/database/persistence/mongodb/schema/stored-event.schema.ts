import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "events", versionKey: false })
export class StoredEvent {
  @Prop({ required: true }) aggregateId: string;
  @Prop({ required: true }) aggregateType: string;
  @Prop({ required: true }) version: number;
  @Prop({ required: true }) type: string;
  @Prop({ type: Object, required: true }) data: Record<string, any>;
  @Prop({ type: Object }) metadata?: Record<string, any>;
  @Prop({ required: true }) occurredAt: Date;
}

export const StoredEventSchema = SchemaFactory.createForClass(StoredEvent);
StoredEventSchema.index({ aggregateId: 1, version: 1 }, { unique: true });