import { Inject, Injectable } from '@nestjs/common';
import type { IIncrRedLineRepository } from './domain/repositories/IIncrRedLineRepository.js';
import type { ILineInOutBasementRepository } from '../line-in-out-basement/domain/repositories/ILineInOutBasementRepository.js';
import { RegisterIncrRedLine } from './application/usecases/RegisterIncrRedLine.js';
import { EditIncrRedLine } from './application/usecases/EditIncrRedLine.js';
import { FindIncrRedLine } from './application/usecases/FindIncrRedLine.js';
import { FindAllIncrRedLines } from './application/usecases/FindAllIncrRedLines.js';
import { DeleteIncrRedLine } from './application/usecases/DeleteIncrRedLine.js';
import { INCR_RED_LINE_REPOSITORY } from './incr-red-line.tokens.js';
import { LINE_IN_OUT_BASEMENT_REPOSITORY } from '../line-in-out-basement/line-in-out-basement.tokens.js';
import { FindByLineInOutIdIncrRedLine } from './application/usecases/FindByLineInOutIdIncrRedLine.js';

@Injectable()
export class IncrRedLineService {
    private readonly registerIncrRedLine: RegisterIncrRedLine;
    private readonly editIncrRedLine: EditIncrRedLine;
    private readonly findIncrRedLine: FindIncrRedLine;
    private readonly findAllIncrRedLines: FindAllIncrRedLines;
    private readonly deleteIncrRedLine: DeleteIncrRedLine;
    private readonly findByLineInOutIdIncrRedLine : FindByLineInOutIdIncrRedLine;
    constructor(
        @Inject(INCR_RED_LINE_REPOSITORY) repository: IIncrRedLineRepository,
        @Inject(LINE_IN_OUT_BASEMENT_REPOSITORY) lineInOutBasementRepository: ILineInOutBasementRepository,
    ) {
        this.registerIncrRedLine = new RegisterIncrRedLine(repository, lineInOutBasementRepository);
        this.editIncrRedLine = new EditIncrRedLine(repository, lineInOutBasementRepository);
        this.findIncrRedLine = new FindIncrRedLine(repository);
        this.findAllIncrRedLines = new FindAllIncrRedLines(repository);
        this.deleteIncrRedLine = new DeleteIncrRedLine(repository);
        this.findByLineInOutIdIncrRedLine = new FindByLineInOutIdIncrRedLine(repository);
    }

    register(input: Parameters<RegisterIncrRedLine['execute']>[0]) {
        return this.registerIncrRedLine.execute(input);
    }

    edit(input: Parameters<EditIncrRedLine['execute']>[0]) {
        return this.editIncrRedLine.execute(input);
    }

    find(input: Parameters<FindIncrRedLine['execute']>[0]) {
        return this.findIncrRedLine.execute(input);
    }

    findAll(input?: Parameters<FindAllIncrRedLines['execute']>[0]) {
        return this.findAllIncrRedLines.execute(input);
    }

    findByLineInOutId(input: Parameters<FindByLineInOutIdIncrRedLine['execute']>[0]){
        return this.findByLineInOutIdIncrRedLine.execute(input);
    }

    delete(input: Parameters<DeleteIncrRedLine['execute']>[0]) {
        return this.deleteIncrRedLine.execute(input);
    }
}
