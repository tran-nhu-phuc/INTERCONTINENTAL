import { Module, UseGuards } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entities';
import { Booking } from 'src/entities/bookings.entities';
import { Comment } from 'src/entities/comments.entities';
import { Like } from 'src/entities/likes.entities';
import { Point } from 'src/entities/points.entities';
import { Ratting } from 'src/entities/rattings.entities';
import { MailModule } from '../mail/mail.module';
import { UploadModule } from '../upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/configs/cloudinary.config';

@Module({
  imports: [
    MailModule,
    UploadModule,
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
    TypeOrmModule.forFeature([User, Booking, Comment, Like, Point, Ratting]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
