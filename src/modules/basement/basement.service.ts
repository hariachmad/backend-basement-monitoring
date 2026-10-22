// basement/basement.service.ts
import { Inject, Injectable } from '@nestjs/common';
import type { IBasementRepository } from './domain/repositories/IBasementRepository.js';
import { RegisterBasement } from './application/usecases/RegisterBasement.js';
import { EditBasement } from './application/usecases/EditBasement.js';
import { FindBasement } from './application/usecases/FindBasement.js';
import { FindAllBasements } from './application/usecases/FindAllBasements.js';
import { DeleteBasement } from './application/usecases/DeleteBasement.js';
import { BASEMENT_REPOSITORY } from './basement.tokens.js';

@Injectable()
export class BasementService {
    private readonly registerBasement: RegisterBasement;
    private readonly editBasement: EditBasement;
    private readonly findBasement: FindBasement;
    private readonly findAllBasements: FindAllBasements;
    private readonly deleteBasement: DeleteBasement;

    constructor(
        @Inject(BASEMENT_REPOSITORY) repository: IBasementRepository,
    ) {
        this.registerBasement = new RegisterBasement(repository);
        this.editBasement = new EditBasement(repository);
        this.findBasement = new FindBasement(repository);
        this.findAllBasements = new FindAllBasements(repository);
        this.deleteBasement = new DeleteBasement(repository);
    }

    register(input: Parameters<RegisterBasement['execute']>[0]) {
        return this.registerBasement.execute(input);
    }

    edit(input: Parameters<EditBasement['execute']>[0]) {
        return this.editBasement.execute(input);
    }

    find(input: Parameters<FindBasement['execute']>[0]) {
        return this.findBasement.execute(input);
    }

    findAll() {
        return this.findAllBasements.execute();
    }

    delete(input: Parameters<DeleteBasement['execute']>[0]) {
        return this.deleteBasement.execute(input);
    }
}