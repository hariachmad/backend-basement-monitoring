import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LineModule } from './modules/line/line.module.js';
import { LineInOutBasementModule } from './modules/line-in-out-basement/line-in-out-basement.module.js';
import { BasementModule } from './modules/basement/basement.module.js';
import { EventEmitterModule } from "@nestjs/event-emitter";
import { LineCrossingModule } from './modules/line-crossing/line-crossing.module.js';
import { InferenceGateway } from './modules/shared/infrastructure/external/websocket/inference.gateway.js';
import { SystemGateway } from './modules/shared/infrastructure/external/websocket/system.gateway.js';
import { IncrRedLineModule } from './modules/incr-red-line/incr-red-line.module.js';
import { EventModule } from './modules/event/event.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { EventStoreModule } from './modules/event-store/event-store.module.js';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'),EventEmitterModule.forRoot(),BasementModule, LineModule, LineInOutBasementModule, LineCrossingModule, IncrRedLineModule, EventModule, EventStoreModule],
  controllers: [AppController],
  providers: [AppService, SystemGateway, InferenceGateway],
})
export class AppModule {}