import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikesRepository } from './likes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from 'src/entities/likes.entities';
import { User } from 'src/entities/users.entities';
import { Comment } from 'src/entities/comments.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Like, User, Comment])],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository],
})
export class LikesModule {}
