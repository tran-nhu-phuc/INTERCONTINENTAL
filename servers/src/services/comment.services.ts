import Comment from "../entities/comment.table";
import CommentRepository from "../repositories/comment.repositories";
import { CommentTypes } from "../types/comment";

class CommentService {
  private repository: CommentRepository;
  constructor() {
    this.repository = new CommentRepository();
  }
  async getAllByRoom(sort: any, limit: number, page: number, idRoom: number) {
    let offset = Math.ceil((page - 1) * limit);
    return await this.repository.getAllByRoom(sort, limit, offset, idRoom);
  }
  async createComment(newData: CommentTypes) {
    return await this.repository.createComment(newData);
  }
  async updateComment(id: number, newData: CommentTypes) {
    return await this.repository.updateComment(id, newData);
  }
  async removeComment(id: number) {
    const result = await this.repository.removeComment(id);
    return result;
  }
}
export default CommentService;
