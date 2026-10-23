import { Prisma, PrismaClient } from "../../../../generated/prisma/client.js";
import { LineMapper } from "../../../shared/infrastructure/database/mappers/LineMapper.js";
import { Line } from "../../domain/entities/Line.js";
import { ILineRepository } from "../../domain/repositories/ILineRepository.js";
import { LineId } from "../../domain/value-object/LineId.js";

export class PrismaLineRepository implements ILineRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findById(id: LineId): Promise<Line | null> {
        const row = await this.prisma.line.findUnique({
            where: { id: id.getValue() },
        });
        return row ? LineMapper.toDomain(row) : null;
    }

    async findByName(name: string): Promise<Line | null> {
        const row = await this.prisma.line.findFirst({
            where: { name: { equals: name, mode: "insensitive" } },
        });
        return row ? LineMapper.toDomain(row) : null;
    }

    async findAll(): Promise<Line[]> {
        const rows = await this.prisma.line.findMany({
            orderBy: { name: "asc" },
        });
        return rows.map(LineMapper.toDomain);
    }

    async save(line: Line): Promise<void> {
        const data = LineMapper.toPersistence(line);
        const { id, ...fields } = data;

        try {
            await this.prisma.line.upsert({
                where: { id },
                create: data,
                update: fields,
            });
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === "P2002"
            ) {
                throw new Error("line name already exists");
            }
            throw e;
        }
    }

    async delete(id: LineId): Promise<void> {
        await this.prisma.line.deleteMany({
            where: { id: id.getValue() },
        });
    }
}
