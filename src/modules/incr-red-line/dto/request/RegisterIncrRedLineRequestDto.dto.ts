import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { LineApply, LineContext } from "../../../../generated/prisma/enums.js";
import { IRegisterIncrRedLineRequest } from "../../application/dto/request/IRegisterIncrRedLineRequest.dto.js";

export class RegisterIncrRedLineRequestDto implements IRegisterIncrRedLineRequest {
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
