import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentsRepository) {}
  async getAllByRoom(roomId: number) {
    try {
      return await this.commentRepository.findAllByRoom(roomId);
    } catch (error) {
      throw error;
    }
  }
  async createComment(newData: any) {
    try {
      return await this.commentRepository.create(newData);
    } catch (error) {
      throw error;
    }
  }
  async updateComment(id: number, newData: any) {
    try {
      return await this.commentRepository.update(id, newData);
    } catch (error) {
      throw error;
    }
  }
  async removeComment(id: number) {
    try {
      return await this.commentRepository.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
