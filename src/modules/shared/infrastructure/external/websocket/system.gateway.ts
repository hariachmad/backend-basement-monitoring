import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import type { MessageBody as SocketMessageBody }  from "./dto/message-body.dto.js";

@WebSocketGateway({
  namespace: "basements",
  cors: { origin: "*" }, 
})
export class SystemGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SystemGateway.name);

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("system:counter")
  handleSubscribe(
    @MessageBody() messageBody: SocketMessageBody,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`system:${messageBody.lineId}`);
    return { subscribed: messageBody.lineId };
  }

  emitUpdated(socketMessageBody : SocketMessageBody) {
    this.server.emit("system:updated", socketMessageBody); 
    this.server.to(`system:${socketMessageBody.lineId}`).emit("system:detail", socketMessageBody); 
  }
}