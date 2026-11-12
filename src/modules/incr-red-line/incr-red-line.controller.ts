import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RegisterIncrRedLineRequestDto } from './dto/request/RegisterIncrRedLineRequestDto.dto.js';
import { EditIncrRedLineRequestDto } from './dto/request/EditIncrRedLineRequestDto.dto.js';
import { IRegisterIncrRedLineResponse } from './application/dto/response/IRegisterIncrRedLineResponse.dto.js';
import { IFindIncrRedLineResponse } from './application/dto/response/IFindIncrRedLineResponse.dto.js';
import { IDeleteIncrRedLineResponse } from './application/dto/response/IDeleteIncrRedLineResponse.dto.js';
import { IncrRedLineId } from './domain/value-object/IncrRedLineId.js';
import { LineInOutBasementId } from '../line-in-out-basement/domain/value-object/LineInOutBasementId.js';
import { IncrRedLineService } from './incr-red-line.service.js';
import { RegisterIncrRedLineResponseDto } from './dto/response/RegisterIncrRedLineResponseDto.dto.js';
import { FindIncrRedLineResponseDto } from './dto/response/FindIncrRedLineResponseDto.dto.js';
import { DeleteIncrRedLineResponseDto } from './dto/response/DeleteIncrRedLineResponseDto.dto.js';

@ApiTags('Incr Red Line')
@Controller('incr-red-line')
export class IncrRedLineController {
    constructor(private readonly incrRedLineService: IncrRedLineService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register a new increment/reduce line configuration' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Increment/reduce line configuration created', type: RegisterIncrRedLineResponseDto })
    register(@Body() body: RegisterIncrRedLineRequestDto): Promise<IRegisterIncrRedLineResponse> {
        return this.incrRedLineService.register(body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all increment/reduce line configurations' })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of all increment/reduce configurations', type: [FindIncrRedLineResponseDto] })
    findAll(): Promise<Array<IFindIncrRedLineResponse>> {
        return this.incrRedLineService.findAll();
    }

    @Get("search")
    @ApiOperation({ summary: 'Search increment/reduce configuration by ID or LineInOutBasement ID' })
    @ApiQuery({ name: 'id', required: false, type: String, description: 'Increment/Reduce Line UUID' })
    @ApiQuery({ name: 'lineInOutBasementId', required: false, type: String, description: 'LineInOutBasement UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Found configuration', type: FindIncrRedLineResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Configuration not found' })
    search(@Query("id") id?: string, @Query("lineInOutBasementId") lineInOutBasementId?: string) {
        return this.incrRedLineService.find({
            id: id ? IncrRedLineId.of(id) : undefined,
            lineInOutBasementId: lineInOutBasementId ? LineInOutBasementId.of(lineInOutBasementId) : undefined,
        });
    }

    @Get(":id")
    @ApiOperation({ summary: 'Find increment/reduce configuration by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Increment/Reduce Line UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Found configuration', type: FindIncrRedLineResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Configuration not found' })
    findById(@Param("id") id: string) {
        return this.incrRedLineService.find({ id: IncrRedLineId.of(id) });
    }

    @Put(":id")
    @ApiOperation({ summary: 'Edit increment/reduce configuration' })
    @ApiParam({ name: 'id', type: String, description: 'Increment/Reduce Line UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Configuration updated successfully', type: FindIncrRedLineResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Configuration not found' })
    async edit(@Param("id") id: string, @Body() body: EditIncrRedLineRequestDto) {
        await this.incrRedLineService.edit({ ...body, id });
        return this.incrRedLineService.find({ id: IncrRedLineId.of(id) });
    }

    @Delete(":id")
    @ApiOperation({ summary: 'Delete increment/reduce configuration by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Increment/Reduce Line UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Configuration deleted successfully', type: DeleteIncrRedLineResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Configuration not found' })
    delete(@Param("id") id: string): Promise<IDeleteIncrRedLineResponse> {
        return this.incrRedLineService.delete({ id });
    }
}
