import { Global, Module } from '@nestjs/common';
import { EventPool } from '../shared/events/EventPool.js';

@Global()
@Module({
    providers: [EventPool],
    exports: [EventPool]
})
export class EventModule {
}
