import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RegisterLineInOutBasementRequestDto } from './dto/request/RegisterLineInOutBasementRequestDto.dto.js';
import { EditLineInOutBasementRequestDto } from './dto/request/EditLineInOutBasementRequestDto.dto.js';
import { IRegisterLineInOutBasementResponse } from './application/dto/response/IRegisterLineInOutBasementResponse.dto.js';
import { IFindLineInOutBasementResponse } from './application/dto/response/IFindLineInOutBasementResponse.dto.js';
import { IDeleteLineInOutBasementResponse } from './application/dto/response/IDeleteLineInOutBasementResponse.dto.js';
import { LineInOutBasementId } from './domain/value-object/LineInOutBasementId.js';
import { LineInOutBasementService } from './line-in-out-basement.service.js';
import { FindByLineIdLineInOutBasementRequestDto } from './dto/request/FindByLineIdLineInOutBasementRequestDto.js';
import { FindLineInOutBasementRequestDto } from './dto/request/FindLineInOutBasementRequestDto.dto.js';
import { RegisterLineInOutBasementResponseDto } from './dto/response/RegisterLineInOutBasementResponseDto.dto.js';
import { FindLineInOutBasementResponseDto } from './dto/response/FindLineInOutBasementResponseDto.dto.js';
import { DeleteLineInOutBasementResponseDto } from './dto/response/DeleteLineInOutBasementResponseDto.dto.js';

@ApiTags('Line In Out Basement')
@Controller('line-in-out-basement')
export class LineInOutBasementController {
    constructor(private readonly lineInOutBasementService: LineInOutBasementService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register a line in/out basement mapping' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Mapping registered successfully', type: RegisterLineInOutBasementResponseDto })
    register(@Body() body: RegisterLineInOutBasementRequestDto): Promise<IRegisterLineInOutBasementResponse> {
        return this.lineInOutBasementService.register(body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all line in/out basement mappings' })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of all mappings', type: [FindLineInOutBasementResponseDto] })
    findAll(): Promise<Array<IFindLineInOutBasementResponse>> {
        return this.lineInOutBasementService.findAll();
    }

    @Get("lineid")
    @ApiOperation({ summary: 'Find line in/out basement mappings by Line ID' })
    @ApiQuery({ name: 'lineId', required: true, type: String, description: 'Line UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of mappings for the line', type: [FindLineInOutBasementResponseDto] })
    searchByLineId(@Query("lineId") query: FindByLineIdLineInOutBasementRequestDto) {
        return this.lineInOutBasementService.findByLineId({
            lineId: query.lineId,
        });
    }

    @Get("search")
    @ApiOperation({ summary: 'Search line in/out basement mapping by ID' })
    @ApiQuery({ name: 'id', required: true, type: String, description: 'LineInOutBasement UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Found mapping', type: FindLineInOutBasementResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Mapping not found' })
    search(@Query("id") query: FindLineInOutBasementRequestDto) {
        return this.lineInOutBasementService.find({
            id: query.id,
        });
    }

    @Get(":id")
    @ApiOperation({ summary: 'Find line in/out basement mapping by ID' })
    @ApiParam({ name: 'id', type: String, description: 'LineInOutBasement UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Found mapping', type: FindLineInOutBasementResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Mapping not found' })
    findById(@Param("id") id: string) {
        return this.lineInOutBasementService.find({ id: LineInOutBasementId.of(id) });
    }

    @Put(":id")
    @ApiOperation({ summary: 'Edit line in/out basement mapping' })
    @ApiParam({ name: 'id', type: String, description: 'LineInOutBasement UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Mapping updated successfully', type: FindLineInOutBasementResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Mapping not found' })
    async edit(@Param("id") id: string, @Body() body: EditLineInOutBasementRequestDto) {
        await this.lineInOutBasementService.edit({ ...body, id });
        return this.lineInOutBasementService.find({ id: LineInOutBasementId.of(id) });
    }

    @Delete(":id")
    @ApiOperation({ summary: 'Delete line in/out basement mapping by ID' })
    @ApiParam({ name: 'id', type: String, description: 'LineInOutBasement UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Mapping deleted successfully', type: DeleteLineInOutBasementResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Mapping not found' })
    delete(@Param("id") id: string): Promise<IDeleteLineInOutBasementResponse> {
        return this.lineInOutBasementService.delete({ id });
    }
}
