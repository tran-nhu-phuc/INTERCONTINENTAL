import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomsRepository } from './rooms.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/entities/rooms.entities';
import { Comment } from 'src/entities/comments.entities';
import { ImageRoom } from 'src/entities/imageRooms.entities';
import { Category } from 'src/entities/categories.entities';
import { Ratting } from 'src/entities/rattings.entities';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/configs/cloudinary.config';
import { UploadModule } from '../upload/upload.module';
import { ImageRoomsModule } from '../image-rooms/image-rooms.module';

@Module({
  imports: [
    ImageRoomsModule,
    UploadModule,
    TypeOrmModule.forFeature([Room, Comment, Category, Ratting]),
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository],
  exports: [RoomsService],
})
export class RoomsModule {}
