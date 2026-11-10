import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service.js';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check / get hello message' })
  @ApiResponse({ status: 200, description: 'Return welcome message', type: String })
  getHello(): string {
    return this.appService.getHello();
  }
}
