import { Prisma, PrismaClient } from "../../../../generated/prisma/client.js";
import { IncrRedLineMapper } from "../../../shared/infrastructure/database/persistence/postgresql/mappers/IncrRedLineMapper.js";
import { LineInOutBasementId } from "../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js";
import { IncrRedLine } from "../../domain/entities/IncrRedLine.js";
import { IIncrRedLineRepository } from "../../domain/repositories/IIncrRedLineRepository.js";
import { IncrRedLineId } from "../../domain/value-object/IncrRedLineId.js";
import { IFindAllIncrRedLineFilter } from "../../application/dto/request/IFindAllIncrRedLineFilter.js";

export class PrismaIncrRedLineRepository implements IIncrRedLineRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findById(id: IncrRedLineId): Promise<IncrRedLine | null> {
        const row = await this.prisma.incrRedLine.findUnique({
            where: { id: id.getValue() },
        });
        return row ? IncrRedLineMapper.toDomain(row) : null;
    }

    async findByLineInOutBasementId(lineInOutBasementId: LineInOutBasementId): Promise<IncrRedLine[]> {
        const rows = await this.prisma.incrRedLine.findMany({
            where: { lineInOutBasementId: lineInOutBasementId.getValue() },
        });
        return rows.map(IncrRedLineMapper.toDomain);
    }

    async findAll(filter: IFindAllIncrRedLineFilter = {}): Promise<IncrRedLine[]> {
        const where: Prisma.IncrRedLineWhereInput = {};

        if (filter.lineInOutBasementId !== undefined) {
            where.lineInOutBasementId = filter.lineInOutBasementId.getValue();
        }
        if (filter.context !== undefined) {
            where.context = filter.context;
        }
        if (filter.apply !== undefined) {
            where.apply = filter.apply;
        }

        const rows = await this.prisma.incrRedLine.findMany({ where });
        return rows.map(IncrRedLineMapper.toDomain);
    }

    async save(incrRedLine: IncrRedLine): Promise<void> {
        const data = IncrRedLineMapper.toPersistence(incrRedLine);
        const { id, ...fields } = data;

        try {
            await this.prisma.incrRedLine.upsert({
                where: { id },
                create: data,
                update: fields,
            });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === "P2002") {
                    throw new Error("LineInOutBasement already configured with IncrRedLine");
                }
                if (e.code === "P2003") {
                    throw new Error("Referenced LineInOutBasement not found");
                }
            }
            throw e;
        }
    }

    async delete(id: IncrRedLineId): Promise<void> {
        await this.prisma.incrRedLine.deleteMany({
            where: { id: id.getValue() },
        });
    }
}
