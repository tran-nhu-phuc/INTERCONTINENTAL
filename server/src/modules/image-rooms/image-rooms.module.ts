import { Module } from '@nestjs/common';
import { ImageRoomsController } from './image-rooms.controller';
import { ImageRoomsService } from './image-rooms.service';
import { ImageRoomRepository } from './image-rooms.repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRoom } from 'src/entities/imageRooms.entities';
import { Room } from 'src/entities/rooms.entities';

@Module({
  imports: [TypeOrmModule.forFeature([ImageRoom, Room])],
  controllers: [ImageRoomsController],
  providers: [ImageRoomsService, ImageRoomRepository],
  exports: [ImageRoomsService],
})
export class ImageRoomsModule {}
