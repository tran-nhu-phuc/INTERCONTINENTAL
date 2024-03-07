import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { PointsRepository } from './points.repositories';
import { Point } from 'src/entities/points.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  controllers: [PointsController],
  providers: [PointsService, PointsRepository],
  exports: [PointsService],
})
export class PointsModule {}
