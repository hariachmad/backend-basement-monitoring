import { Prisma, PrismaClient } from "../../../../generated/prisma/client.js";
import { LineInOutBasementMapper } from "../../../shared/infrastructure/database/mappers/LineInOutBasementMapper.js";
import { BasementId } from "../../../basement/domain/value-object/BasementId.js";
import { LineId } from "../../../line/domain/value-object/LineId.js";
import { LineInOutBasement } from "../../domain/entities/LineInOutBasement.js";
import { ILineInOutBasementRepository } from "../../domain/repositories/ILineInOutBasementRepository.js";
import { LineInOutBasementId } from "../../domain/value-object/LineInOutBasementId.js";
import { IFindLineInOutBasementFilter } from "../../application/dto/request/IFindAllLineInOutBasementFilter.js";

export class PrismaLineInOutBasementRepository implements ILineInOutBasementRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findById(id: LineInOutBasementId): Promise<LineInOutBasement | null> {
        const row = await this.prisma.lineInOutBasement.findUnique({
            where: { id: id.getValue() },
        });
        return row ? LineInOutBasementMapper.toDomain(row) : null;
    }

    async findByLineId(lineId: LineId): Promise<LineInOutBasement | null> {
        const row = await this.prisma.lineInOutBasement.findUnique({
            where: { lineId: lineId.getValue() },
        });
        return row ? LineInOutBasementMapper.toDomain(row) : null;
    }

    async findByBasementId(basementId: BasementId): Promise<LineInOutBasement[]> {
        const rows = await this.prisma.lineInOutBasement.findMany({
            where: {
                OR: [
                    { inToBasementId: basementId.getValue() },
                    { outToBasementId: basementId.getValue() },
                ],
            },
        });
        return rows.map(LineInOutBasementMapper.toDomain);
    }

    async findAll(filter: IFindLineInOutBasementFilter = {}): Promise<LineInOutBasement[]> {
        const where: Prisma.LineInOutBasementWhereInput = {};

        if (filter.lineId !== undefined) {
            where.lineId = filter.lineId.getValue();
        }
        if (filter.inToBasement !== undefined) {
            where.inToBasementId = filter.inToBasement.getValue();
        }
        if (filter.outToBasement !== undefined) {
            where.outToBasementId = filter.outToBasement.getValue();
        }

        const rows = await this.prisma.lineInOutBasement.findMany({ where });

        return rows.map(LineInOutBasementMapper.toDomain);
    }

    async save(lineInOutBasement: LineInOutBasement): Promise<void> {
        const data = LineInOutBasementMapper.toPersistence(lineInOutBasement);
        const { id, ...fields } = data;

        try {
            await this.prisma.lineInOutBasement.upsert({
                where: { id },
                create: data,
                update: fields,
            });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === "P2002") {
                    throw new Error("line already mapped to basement");
                }
                if (e.code === "P2003") {
                    throw new Error("referenced line or basement not found");
                }
            }
            throw e;
        }
    }

    async delete(id: LineInOutBasementId): Promise<void> {
        await this.prisma.lineInOutBasement.deleteMany({
            where: { id: id.getValue() },
        });
    }
}
