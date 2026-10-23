import { IDeleteLineInOutBasementRequest } from "../../application/dto/request/IDeleteLineInOutBasementRequest.dto.js";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteLineInOutBasementRequestDto implements IDeleteLineInOutBasementRequest {
    @IsString()
    @IsNotEmpty()
    id: string;
}
