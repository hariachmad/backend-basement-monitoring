import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { RegisterIncrRedLineRequestDto } from './dto/request/RegisterIncrRedLineRequestDto.dto.js';
import { EditIncrRedLineRequestDto } from './dto/request/EditIncrRedLineRequestDto.dto.js';
import { IRegisterIncrRedLineResponse } from './application/dto/response/IRegisterIncrRedLineResponse.dto.js';
import { IFindIncrRedLineResponse } from './application/dto/response/IFindIncrRedLineResponse.dto.js';
import { IDeleteIncrRedLineResponse } from './application/dto/response/IDeleteIncrRedLineResponse.dto.js';
import { IncrRedLineId } from './domain/value-object/IncrRedLineId.js';
import { LineInOutBasementId } from '../line-in-out-basement/domain/value-object/LineInOutBasementId.js';
import { IncrRedLineService } from './incr-red-line.service.js';

@Controller('incr-red-line')
export class IncrRedLineController {
    constructor(private readonly incrRedLineService: IncrRedLineService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    register(@Body() body: RegisterIncrRedLineRequestDto): Promise<IRegisterIncrRedLineResponse> {
        return this.incrRedLineService.register(body);
    }

    @Get()
    findAll(): Promise<Array<IFindIncrRedLineResponse>> {
        return this.incrRedLineService.findAll();
    }

    @Get("search")
    search(@Query("id") id?: string, @Query("lineInOutBasementId") lineInOutBasementId?: string) {
        return this.incrRedLineService.find({
            id: id ? IncrRedLineId.of(id) : undefined,
            lineInOutBasementId: lineInOutBasementId ? LineInOutBasementId.of(lineInOutBasementId) : undefined,
        });
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.incrRedLineService.find({ id: IncrRedLineId.of(id) });
    }

    @Put(":id")
    async edit(@Param("id") id: string, @Body() body: EditIncrRedLineRequestDto) {
        await this.incrRedLineService.edit({ ...body, id });
        return this.incrRedLineService.find({ id: IncrRedLineId.of(id) });
    }

    @Delete(":id")
    delete(@Param("id") id: string): Promise<IDeleteIncrRedLineResponse> {
        return this.incrRedLineService.delete({ id });
    }
}
