// src/socket/socket.service.ts
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private clients: Socket[] = [];

  addClient(client: Socket): void {
    this.clients.push(client);
    console.log(`Client connected: ${client.id}`);
  }

  removeClient(client: Socket): void {
    this.clients = this.clients.filter((c) => c !== client);
    console.log(`Client disconnected: ${client.id}`);
  }

  emitToAll(event: string, data: any): void {
    this.clients.forEach((client) => client.emit(event, data));
  }
}
