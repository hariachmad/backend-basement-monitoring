import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { LineApply, LineContext } from "../../../../generated/prisma/enums.js";
import { IEditIncrRedLineRequest } from "../../application/dto/request/IEditIncrRedLineRequest.dto.js";

export class EditIncrRedLineRequestDto implements IEditIncrRedLineRequest {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    lineInOutBasementId: string;

    @IsEnum(LineContext)
    @IsNotEmpty()
    context: LineContext;

    @IsEnum(LineApply)
    @IsNotEmpty()
    apply: LineApply;
}
