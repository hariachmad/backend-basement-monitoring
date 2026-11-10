import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { LineApply, LineContext } from "../../../../generated/prisma/enums.js";
import { IEditIncrRedLineRequest } from "../../application/dto/request/IEditIncrRedLineRequest.dto.js";

export class EditIncrRedLineRequestDto implements IEditIncrRedLineRequest {
    @ApiProperty({ description: 'Increment/Reduce Line configuration UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'LineInOutBasement UUID', example: '123e4567-e89b-12d3-a456-426614174001' })
    @IsUUID()
    @IsNotEmpty()
    lineInOutBasementId: string;

    @ApiProperty({ description: 'Line direction context', enum: LineContext, example: 'in' })
    @IsEnum(LineContext)
    @IsNotEmpty()
    context: LineContext;

    @ApiProperty({ description: 'Operation applied to counter', enum: LineApply, example: 'INCREMENT' })
    @IsEnum(LineApply)
    @IsNotEmpty()
    apply: LineApply;
}
