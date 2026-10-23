import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';

import { RegisterLineRequestDto } from './dto/request/RegisterLineRequestDto.dto.js';
import { IRegisterLineResponse } from './application/dto/response/IRegisterLineResponse.dto.js';
import { IFindLineResponse } from './application/dto/response/IFindLineResponse.dto.js';
import { IDeleteLineResponse } from './application/dto/response/IDeleteLineResponse.dto.js';
import { LineId } from './domain/value-object/LineId.js';
import { EditLineRequestDto } from './dto/request/EditLineRequestDto.dto.js';
import { LineService } from './line.service.js';

@Controller('line')
export class LineController {
    constructor(private readonly lineService: LineService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    register(@Body() body: RegisterLineRequestDto): Promise<IRegisterLineResponse> {
        return this.lineService.register(body);
    }

    @Get()
    findAll(): Promise<Array<IFindLineResponse>> {
        return this.lineService.findAll();
    }

    @Get("search")
    search(@Query("id") id?: string, @Query("name") name?: string) {
        if (id) {
            return this.lineService.find({ id: LineId.of(id), name });
        }
        return this.lineService.find({ id: undefined, name });
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.lineService.find({ id: LineId.of(id) });
    }

    @Put(":id")
    async edit(@Param("id") id: string, @Body() body: EditLineRequestDto) {
        await this.lineService.edit({ ...body, id });
        return this.lineService.find({ id: LineId.of(id) });
    }

    @Delete(":id")
    delete(@Param("id") id: string): Promise<IDeleteLineResponse> {
        return this.lineService.delete({ id });
    }
}
