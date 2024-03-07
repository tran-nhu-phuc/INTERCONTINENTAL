import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/entities/likes.entities';
import { Repository } from 'typeorm';

export class LikesRepository {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}
  async create(newData: any) {
    return this.likeRepository.save(newData);
  }
  async remove(id: number) {
    return this.likeRepository.delete({ id });
  }
  async findOne(commentId: number, userId: number) {
    return this.likeRepository.findOne({ where: { commentId, userId } });
  }
}
