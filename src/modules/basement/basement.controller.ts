import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';

import { RegisterBasementRequestDto } from './dto/request/RegisterBasementRequestDto.dto.js';
import { IRegisterBasementResponse } from './application/dto/response/IRegisterBasementResponse.dto.js';
import { IFindBasementResponse } from './application/dto/response/IFindBasementResponse.dto.js';
import { BasementId } from './domain/value-object/BasementId.js';
import { EditBasementRequestDto } from './dto/request/EditBasementRequestDto.dto.js';
import { BasementService } from './basement.service.js';

@Controller('basement')
export class BasementController {
    constructor(private readonly basementService: BasementService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    register(@Body() body: RegisterBasementRequestDto): Promise<IRegisterBasementResponse> {
        return this.basementService.register(body);
    }

    @Get()
    findAll(): Promise<Array<IFindBasementResponse>> {
        return this.basementService.findAll();
    }

    @Get("search")
    search(@Query("id") id?: string, @Query("name") name?: string) {
        if (id) {
            return this.basementService.find({ id: BasementId.of(id), name });
        }
        return this.basementService.find({ id: null, name });
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.basementService.find({ id: BasementId.of(id) });
    }

    @Put(":id")
    async edit(@Param("id") id: string, @Body() body: EditBasementRequestDto) {
        await this.basementService.edit({ ...body });
        return this.basementService.find({ id: BasementId.of(body.id) });
    }
}
