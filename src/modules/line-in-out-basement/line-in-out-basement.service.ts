import { Inject, Injectable } from '@nestjs/common';
import type { ILineInOutBasementRepository } from './domain/repositories/ILineInOutBasementRepository.js';
import type { ILineRepository } from '../line/domain/repositories/ILineRepository.js';
import type { IBasementRepository } from '../basement/domain/repositories/IBasementRepository.js';
import { RegisterLineInOutBasement } from './application/usecases/RegisterLineInOutBasement.js';
import { EditLineInOutBasement } from './application/usecases/EditLineInOutBasement.js';
import { FindLineInOutBasement } from './application/usecases/FindLineInOutBasement.js';
import { FindAllLineInOutBasements } from './application/usecases/FindAllLineInOutBasements.js';
import { DeleteLineInOutBasement } from './application/usecases/DeleteLineInOutBasement.js';
import { LINE_IN_OUT_BASEMENT_REPOSITORY } from './line-in-out-basement.tokens.js';
import { LINE_REPOSITORY } from '../line/line.tokens.js';
import { BASEMENT_REPOSITORY } from '../basement/basement.tokens.js';

@Injectable()
export class LineInOutBasementService {
    private readonly registerLineInOutBasement: RegisterLineInOutBasement;
    private readonly editLineInOutBasement: EditLineInOutBasement;
    private readonly findLineInOutBasement: FindLineInOutBasement;
    private readonly findAllLineInOutBasements: FindAllLineInOutBasements;
    private readonly deleteLineInOutBasement: DeleteLineInOutBasement;

    constructor(
        @Inject(LINE_IN_OUT_BASEMENT_REPOSITORY) repository: ILineInOutBasementRepository,
        @Inject(LINE_REPOSITORY) lineRepository: ILineRepository,
        @Inject(BASEMENT_REPOSITORY) basementRepository: IBasementRepository,
    ) {
        this.registerLineInOutBasement = new RegisterLineInOutBasement(repository, lineRepository, basementRepository);
        this.editLineInOutBasement = new EditLineInOutBasement(repository, lineRepository, basementRepository);
        this.findLineInOutBasement = new FindLineInOutBasement(repository);
        this.findAllLineInOutBasements = new FindAllLineInOutBasements(repository);
        this.deleteLineInOutBasement = new DeleteLineInOutBasement(repository);
    }

    register(input: Parameters<RegisterLineInOutBasement['execute']>[0]) {
        return this.registerLineInOutBasement.execute(input);
    }

    edit(input: Parameters<EditLineInOutBasement['execute']>[0]) {
        return this.editLineInOutBasement.execute(input);
    }

    find(input: Parameters<FindLineInOutBasement['execute']>[0]) {
        return this.findLineInOutBasement.execute(input);
    }

    findAll(input?: Parameters<FindAllLineInOutBasements['execute']>[0]) {
        return this.findAllLineInOutBasements.execute(input);
    }

    delete(input: Parameters<DeleteLineInOutBasement['execute']>[0]) {
        return this.deleteLineInOutBasement.execute(input);
    }
}
