// src/websockets/app.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CommentsService } from '../comments/comments.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private commentsService: CommentsService) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return `Hello, ${payload}!`;
  }

  @SubscribeMessage('comment')
  handleComment(
    client: any,
    commentData: { comment: Comment; idRoom: number },
  ): void {
    const { comment, idRoom } = commentData;
    this.commentsService.createComment(comment);
    this.sendCommentsToAllClients(client, idRoom);
    this.sendCommentsToClient(client, idRoom);
  }

  private sendCommentsToClient(client: any, idRoom: number): void {
    const comments = this.commentsService.getAllByRoom(idRoom);
    client.emit('comments', comments);
  }

  private sendCommentsToAllClients(client: any, idRoom: number): void {
    const comments = this.commentsService.getAllByRoom(idRoom);
    this.server.emit('comments', comments);
  }
}
