import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { LineModule } from './modules/line/line.module.js';
import { LineInOutBasementModule } from './modules/line-in-out-basement/line-in-out-basement.module.js';
import { BasementModule } from './modules/basement/basement.module.js';
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [EventEmitterModule.forRoot(),BasementModule, LineModule, LineInOutBasementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
