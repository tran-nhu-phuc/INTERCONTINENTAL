import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comments.entities';
import { User } from 'src/entities/users.entities';
import { Room } from 'src/entities/rooms.entities';
import { Like } from 'src/entities/likes.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Room, Like])],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
