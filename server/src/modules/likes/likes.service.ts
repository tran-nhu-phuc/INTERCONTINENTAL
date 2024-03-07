import { Injectable } from '@nestjs/common';
import { LikesRepository } from './likes.repository';

@Injectable()
export class LikesService {
  constructor(private readonly likeRepository: LikesRepository) {}
  async create(newData: any) {
    try {
      const result = await this.likeRepository.findOne(
        newData.commentId as number,
        newData.userId as number,
      );
      if (result === null) {
        return await this.likeRepository.create(newData);
      } else {
        return await this.likeRepository.remove(result?.id);
      }
    } catch (error) {
      throw error;
    }
  }
  async remove(id: number) {
    try {
      return await this.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
