import { Prisma, PrismaClient } from "../../../../generated/prisma/client.js";
import { BasementMapper } from "../../../shared/infrastructure/database/mappers/BasementMapper.js";
import { Basement } from "../../domain/entities/Basement.js";
import { IBasementRepository } from "../../domain/repositories/IBasementRepository.js";
import { BasementId } from "../../domain/value-object/BasementId.js";

export class PrismaBasementRepository implements IBasementRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findById(id: BasementId): Promise<Basement | null> {
        const row = await this.prisma.basement.findUnique({
            where: { id: id.getValue() },
        });
        return row ? BasementMapper.toDomain(row) : null;
    }

    async findByName(name: string): Promise<Basement | null> {
        const row = await this.prisma.basement.findFirst({
            where: { name: { equals: name, mode: "insensitive" } },
        });
        return row ? BasementMapper.toDomain(row) : null;
    }

    async findAll(): Promise<Basement[]> {
        const rows = await this.prisma.basement.findMany({
            orderBy: { name: "asc" },
        });
        return rows.map(BasementMapper.toDomain);
    }

    async save(basement: Basement): Promise<void> {
        const data = BasementMapper.toPersistence(basement);
        const { id, ...fields } = data;

        try {
            await this.prisma.basement.upsert({
                where: { id },
                create: data,
                update: fields,
            });
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === "P2002"
            ) {
                throw new Error("basement name already exists");
            }
            throw e;
        }
    }

    async delete(id: BasementId): Promise<void> {
        await this.prisma.basement.deleteMany({
            where: { id: id.getValue() },
        });
    }
}