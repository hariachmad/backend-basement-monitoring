import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RegisterBasementRequestDto } from './dto/request/RegisterBasementRequestDto.dto.js';
import { IRegisterBasementResponse } from './application/dto/response/IRegisterBasementResponse.dto.js';
import { IFindBasementResponse } from './application/dto/response/IFindBasementResponse.dto.js';
import { BasementId } from './domain/value-object/BasementId.js';
import { EditBasementRequestDto } from './dto/request/EditBasementRequestDto.dto.js';
import { BasementService } from './basement.service.js';
import { RegisterBasementResponseDto } from './dto/response/RegisterBasementResponseDto.dto.js';
import { FindBasementResponseDto } from './dto/response/FindBasementResponseDto.dto.js';

@ApiTags('Basement')
@Controller('basement')
export class BasementController {
    constructor(private readonly basementService: BasementService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register a new basement' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Basement registered successfully', type: RegisterBasementResponseDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Basement name already exists or invalid data' })
    register(@Body() body: RegisterBasementRequestDto): Promise<IRegisterBasementResponse> {
        return this.basementService.register(body);
    }

    @Get()
    @ApiOperation({ summary: 'Get all basements' })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of all basements', type: [FindBasementResponseDto] })
    findAll(): Promise<Array<IFindBasementResponse>> {
        return this.basementService.findAll();
    }

    @Get("search")
    @ApiOperation({ summary: 'Search basement by ID or name' })
    @ApiQuery({ name: 'id', required: false, type: String, description: 'Basement UUID' })
    @ApiQuery({ name: 'name', required: false, type: String, description: 'Basement name' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Found basement', type: FindBasementResponseDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid query parameters (provide only one of id or name)' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Basement not found' })
    search(@Query("id") id?: string, @Query("name") name?: string) {
        if (id) {
            return this.basementService.find({ id: BasementId.of(id), name });
        }
        return this.basementService.find({ id: null, name });
    }

    @Get(":id")
    @ApiOperation({ summary: 'Find basement by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Basement UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Found basement', type: FindBasementResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Basement not found' })
    findById(@Param("id") id: string) {
        return this.basementService.find({ id: BasementId.of(id) });
    }

    @Put(":id")
    @ApiOperation({ summary: 'Edit basement details' })
    @ApiParam({ name: 'id', type: String, description: 'Basement UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Basement updated successfully', type: FindBasementResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Basement not found' })
    async edit(@Param("id") id: string, @Body() body: EditBasementRequestDto) {
        await this.basementService.edit({ ...body });
        return this.basementService.find({ id: BasementId.of(body.id) });
    }
}
