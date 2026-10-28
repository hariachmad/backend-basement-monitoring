import { Module } from '@nestjs/common';
import { LineCrossingService } from './line-crossing.service.js';
import { LineInOutBasementModule } from '../line-in-out-basement/line-in-out-basement.module.js';
import { BasementModule } from '../basement/basement.module.js';
import { IncrRedLineModule } from '../incr-red-line/incr-red-line.module.js';

@Module({
  imports: [
    LineInOutBasementModule,   
    BasementModule,
    IncrRedLineModule
  ],
  providers: [LineCrossingService],
})
export class LineCrossingModule {}
