import { Module } from '@nestjs/common';
import { LineCrossingService } from './line-crossing.service.js';

@Module({
  providers: [LineCrossingService]
})
export class LineCrossingModule {}
