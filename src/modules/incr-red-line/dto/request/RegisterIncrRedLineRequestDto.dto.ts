import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { LineApply, LineContext } from "../../../../generated/prisma/enums.js";
import { IRegisterIncrRedLineRequest } from "../../application/dto/request/IRegisterIncrRedLineRequest.dto.js";

export class RegisterIncrRedLineRequestDto implements IRegisterIncrRedLineRequest {
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
