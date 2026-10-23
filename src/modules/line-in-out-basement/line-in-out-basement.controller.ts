import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';

import { RegisterLineInOutBasementRequestDto } from './dto/request/RegisterLineInOutBasementRequestDto.dto.js';
import { EditLineInOutBasementRequestDto } from './dto/request/EditLineInOutBasementRequestDto.dto.js';
import { IRegisterLineInOutBasementResponse } from './application/dto/response/IRegisterLineInOutBasementResponse.dto.js';
import { IFindLineInOutBasementResponse } from './application/dto/response/IFindLineInOutBasementResponse.dto.js';
import { IDeleteLineInOutBasementResponse } from './application/dto/response/IDeleteLineInOutBasementResponse.dto.js';
import { LineInOutBasementId } from './domain/value-object/LineInOutBasementId.js';
import { LineId } from '../line/domain/value-object/LineId.js';
import { LineInOutBasementService } from './line-in-out-basement.service.js';

@Controller('line-in-out-basement')
export class LineInOutBasementController {
    constructor(private readonly lineInOutBasementService: LineInOutBasementService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    register(@Body() body: RegisterLineInOutBasementRequestDto): Promise<IRegisterLineInOutBasementResponse> {
        return this.lineInOutBasementService.register(body);
    }

    @Get()
    findAll(): Promise<Array<IFindLineInOutBasementResponse>> {
        return this.lineInOutBasementService.findAll();
    }

    @Get("search")
    search(@Query("id") id?: string, @Query("lineId") lineId?: string) {
        return this.lineInOutBasementService.find({
            id: id ? LineInOutBasementId.of(id) : undefined,
            lineId: lineId ? LineId.of(lineId) : undefined,
        });
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.lineInOutBasementService.find({ id: LineInOutBasementId.of(id) });
    }

    @Put(":id")
    async edit(@Param("id") id: string, @Body() body: EditLineInOutBasementRequestDto) {
        await this.lineInOutBasementService.edit({ ...body, id });
        return this.lineInOutBasementService.find({ id: LineInOutBasementId.of(id) });
    }

    @Delete(":id")
    delete(@Param("id") id: string): Promise<IDeleteLineInOutBasementResponse> {
        return this.lineInOutBasementService.delete({ id });
    }
}
