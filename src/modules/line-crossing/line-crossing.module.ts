import { Module } from '@nestjs/common';
import { LineCrossingService } from './line-crossing.service.js';
import { LineInOutBasementModule } from '../line-in-out-basement/line-in-out-basement.module.js';
import { BasementModule } from '../basement/basement.module.js';
import { EventPool } from '../shared/events/EventPool.js';

@Module({
  imports: [
    LineInOutBasementModule,   
    BasementModule,
  ],
  providers: [LineCrossingService, EventPool],
})
export class LineCrossingModule {}
