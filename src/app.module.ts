import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { LineModule } from './modules/line/line.module.js';
import { LineInOutBasementModule } from './modules/line-in-out-basement/line-in-out-basement.module.js';
import { BasementModule } from './modules/basement/basement.module.js';
import { EventEmitterModule } from "@nestjs/event-emitter";
import { OccupancyModule } from './modules/occupancy/occupancy.module.js';
import { LineCrossingModule } from './modules/line-crossing/line-crossing.module.js';

@Module({
  imports: [EventEmitterModule.forRoot(),BasementModule, LineModule, LineInOutBasementModule, OccupancyModule, LineCrossingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
