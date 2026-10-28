import { IsNotEmpty, IsString } from "class-validator";
import { IDeleteIncrRedLineRequest } from "../../application/dto/request/IDeleteIncrRedLineRequest.dto.js";

export class DeleteIncrRedLineRequestDto implements IDeleteIncrRedLineRequest {
    @IsString()
    @IsNotEmpty()
    id: string;
}
