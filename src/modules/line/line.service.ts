// line/line.service.ts
import { Inject, Injectable } from '@nestjs/common';
import type { ILineRepository } from './domain/repositories/ILineRepository.js';
import { RegisterLine } from './application/usecases/RegisterLine.js';
import { EditLine } from './application/usecases/EditLine.js';
import { FindLine } from './application/usecases/FindLine.js';
import { FindAllLines } from './application/usecases/FindAllLines.js';
import { DeleteLine } from './application/usecases/DeleteLine.js';
import { LINE_REPOSITORY } from './line.tokens.js';

@Injectable()
export class LineService {
    private readonly registerLine: RegisterLine;
    private readonly editLine: EditLine;
    private readonly findLine: FindLine;
    private readonly findAllLines: FindAllLines;
    private readonly deleteLine: DeleteLine;

    constructor(
        @Inject(LINE_REPOSITORY) repository: ILineRepository,
    ) {
        this.registerLine = new RegisterLine(repository);
        this.editLine = new EditLine(repository);
        this.findLine = new FindLine(repository);
        this.findAllLines = new FindAllLines(repository);
        this.deleteLine = new DeleteLine(repository);
    }

    register(input: Parameters<RegisterLine['execute']>[0]) {
        return this.registerLine.execute(input);
    }

    edit(input: Parameters<EditLine['execute']>[0]) {
        return this.editLine.execute(input);
    }

    find(input: Parameters<FindLine['execute']>[0]) {
        return this.findLine.execute(input);
    }

    findAll() {
        return this.findAllLines.execute();
    }

    delete(input: Parameters<DeleteLine['execute']>[0]) {
        return this.deleteLine.execute(input);
    }
}
