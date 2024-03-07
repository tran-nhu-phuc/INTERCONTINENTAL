import { Module } from '@nestjs/common';
import { RattingsController } from './rattings.controller';
import { RattingsService } from './rattings.service';
import { RattingsRepository } from './rattings.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ratting } from 'src/entities/rattings.entities';
import { Room } from 'src/entities/rooms.entities';
import { User } from 'src/entities/users.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Ratting, Room, User])],
  controllers: [RattingsController],
  providers: [RattingsService, RattingsRepository],
})
export class RattingsModule {}
