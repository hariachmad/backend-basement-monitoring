import { Global, Module } from '@nestjs/common';
import { EventStoreService } from './event-store.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { StoredEvent, StoredEventSchema } from '../shared/infrastructure/database/persistence/mongodb/schema/stored-event.schema.js';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StoredEvent.name, schema: StoredEventSchema },
    ]),
  ],
  providers: [EventStoreService],
  exports: [EventStoreService, MongooseModule],
})
export class EventStoreModule {}
