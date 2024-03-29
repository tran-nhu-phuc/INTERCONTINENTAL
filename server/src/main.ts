import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://project-module-2.onrender.com',
    credentials: true,
    optionsSuccessStatus: 200,
  });

  app.enableCors({
    origin: 'http://localhost:3000', // Cấu hình origin của bạn
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Use SocketIoAdapter
  app.useWebSocketAdapter(new IoAdapter(app));
  app.use(cookieParser());
  await app.listen(8000);
}
bootstrap();
