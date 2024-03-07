import { Injectable } from '@nestjs/common';
import { PointsRepository } from './points.repositories';

@Injectable()
export class PointsService {
  constructor(private readonly pointRepository: PointsRepository) {}

  async findOneBy(userId: number) {
    try {
      return await this.pointRepository.findOne(userId);
    } catch (error) {
      throw error;
    }
  }
}
