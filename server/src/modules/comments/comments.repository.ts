import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comments.entities';
import { Repository } from 'typeorm';

export class CommentsRepository {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}
  async findAllByRoom(roomId: number) {
    try {
      return await this.commentRepository.findBy({ roomId });
    } catch (error) {
      throw error;
    }
  }
  async create(newData: any) {
    try {
      return await this.commentRepository.save(newData);
    } catch (error) {
      throw error;
    }
  }
  async update(id: number, newData: any) {
    try {
      return await this.commentRepository.update({ id }, newData);
    } catch (error) {
      throw error;
    }
  }
  async remove(id: number) {
    try {
      return await this.commentRepository.delete({ id });
    } catch (error) {
      throw error;
    }
  }
}
