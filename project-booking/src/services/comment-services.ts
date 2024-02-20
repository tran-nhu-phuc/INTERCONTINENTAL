import CommentRepository from "../repositories/comment-repositories";

class CommentService {
  private commentRepository: CommentRepository;
  constructor() {
    this.commentRepository = new CommentRepository();
  }
  async addNewComment(newData: any) {
    try {
      return await this.commentRepository.addNewComment(newData);
    } catch (error) {
      throw error;
    }
  }
  async getAllByRoom(id: number) {
    try {
      return await this.commentRepository.getAllByRoom(id);
    } catch (error) {
      throw error;
    }
  }
  async removeComment(id: number) {
    try {
      return await this.commentRepository.removeComment(id);
    } catch (error) {
      throw error;
    }
  }
}

export default CommentService;
