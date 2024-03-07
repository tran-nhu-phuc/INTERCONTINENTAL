import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'src/entities/points.entities';
import { Repository } from 'typeorm';

export class PointsRepository {
  constructor(
    @InjectRepository(Point)
    private pointRepository: Repository<Point>,
  ) {}
  async findOne(userId: number) {
    try {
      return await this.pointRepository.findOne({
        where: { userId },
      });
    } catch (error) {}
  }
}
