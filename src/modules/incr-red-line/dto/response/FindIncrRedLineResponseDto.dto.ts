import { ApiProperty } from '@nestjs/swagger';
import { LineApply, LineContext } from '../../../../generated/prisma/enums.js';
import { IFindIncrRedLineResponse } from '../../application/dto/response/IFindIncrRedLineResponse.dto.js';
import { IncrRedLineId } from '../../domain/value-object/IncrRedLineId.js';
import { LineInOutBasementId } from '../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js';

export class FindIncrRedLineResponseDto implements IFindIncrRedLineResponse {
    @ApiProperty({ description: 'Increment/Reduce Line configuration ID', example: '123e4567-e89b-12d3-a456-426614174000', type: String })
    id: IncrRedLineId;

    @ApiProperty({ description: 'Associated LineInOutBasement ID', example: '123e4567-e89b-12d3-a456-426614174001', type: String })
    lineInOutBasementId: LineInOutBasementId;

    @ApiProperty({ description: 'Context direction of the line event', enum: ['in', 'out'], example: 'in' })
    context: LineContext;

    @ApiProperty({ description: 'Action applied to basement count', enum: ['INCREMENT', 'REDUCE'], example: 'INCREMENT' })
    apply: LineApply;
}

