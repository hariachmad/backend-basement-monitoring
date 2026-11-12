import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RegisterLineRequestDto } from './dto/request/RegisterLineRequestDto.dto.js';
import { IRegisterLineResponse } from './application/dto/response/IRegisterLineResponse.dto.js';
import { IFindLineResponse } from './application/dto/response/IFindLineResponse.dto.js';
import { IDeleteLineResponse } from './application/dto/response/IDeleteLineResponse.dto.js';
import { LineId } from './domain/value-object/LineId.js';
import { EditLineRequestDto } from './dto/request/EditLineRequestDto.dto.js';
import { LineService } from './line.service.js';
import { RegisterLineResponseDto } from './dto/response/RegisterLineResponseDto.dto.js';
import { FindLineResponseDto } from './dto/response/FindLineResponseDto.dto.js';
import { DeleteLineResponseDto } from './dto/response/DeleteLineResponseDto.dto.js';

@ApiTags('Line')
@Controller('line')
export class LineController {
    constructor(private readonly lineService: LineService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register a new line' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Line registered successfully', type: RegisterLineResponseDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Line name already exists or invalid data' })
    register(@Body() body: RegisterLineRequestDto): Promise<IRegisterLineResponse> {
        return this.lineService.register(body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all lines' })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of all lines', type: [FindLineResponseDto] })
    findAll(): Promise<Array<IFindLineResponse>> {
        return this.lineService.findAll();
    }

    @Get("search")
    @ApiOperation({ summary: 'Search line by ID or name' })
    @ApiQuery({ name: 'id', required: false, type: String, description: 'Line UUID' })
    @ApiQuery({ name: 'name', required: false, type: String, description: 'Line name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Found line', type: FindLineResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Line not found' })
    search(@Query("id") id?: string, @Query("name") name?: string) {
        if (id) {
            return this.lineService.find({ id: LineId.of(id), name });
        }
        return this.lineService.find({ id: undefined, name });
    }

    @Get(":id")
    @ApiOperation({ summary: 'Find line by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Line UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Found line', type: FindLineResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Line not found' })
    findById(@Param("id") id: string) {
        return this.lineService.find({ id: LineId.of(id) });
    }

    @Put(":id")
    @ApiOperation({ summary: 'Edit line details' })
    @ApiParam({ name: 'id', type: String, description: 'Line UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Line updated successfully', type: FindLineResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Line not found' })
    async edit(@Param("id") id: string, @Body() body: EditLineRequestDto) {
        await this.lineService.edit({ ...body, id });
        return this.lineService.find({ id: LineId.of(id) });
    }

    @Delete(":id")
    @ApiOperation({ summary: 'Delete line by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Line UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Line deleted successfully', type: DeleteLineResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Line not found' })
    delete(@Param("id") id: string): Promise<IDeleteLineResponse> {
        return this.lineService.delete({ id });
    }
}
