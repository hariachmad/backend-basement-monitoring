// features/inference/infrastructure/InferenceGateway.ts
import { Logger } from "@nestjs/common";
import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { EventPool } from "../../../events/EventPool.js";
import { EventId } from "../../../value-object/EventId.js";
import { LineId } from "../../../../line/domain/value-object/LineId.js";
import { Direction } from "../../../../../common/types/Direction.js";

@WebSocketGateway({ namespace: "inference" })
export class InferenceGateway {
    private readonly logger = new Logger(InferenceGateway.name);

    constructor(private readonly eventPool: EventPool) {}

    @SubscribeMessage("line:crossed")
    onLineCrossed(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        const direction = String(data?.direction ?? "");
        if (!data?.lineId || !["in", "out"].includes(direction)) {
            this.logger.warn(`payload not valid from ${client.id}`);
            return { ok: false, error: "invalid payload" };
        }

        void this.eventPool.publish("line.crossed", {
            eventId: EventId.of(EventId.generate().getValue()),
            lineId: LineId.of(data.lineId),
            direction: direction as Direction,
            occurredAt: new Date(data.occurredAt ?? Date.now()),
        });

        return { ok: true };
    }
}