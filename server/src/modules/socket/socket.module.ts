// src/websockets/websockets.module.ts
import { Module } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { AppGateway } from './socket.gateway';

@WebSocketGateway()
@Module({
  providers: [AppGateway],
})
export class WebsocketsModule {}
