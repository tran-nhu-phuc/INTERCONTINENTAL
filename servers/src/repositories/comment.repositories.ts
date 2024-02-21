import Comment from "../entities/comment.table";
import Ratting from "../entities/ratting.table";
import User from "../entities/user.table";
import Like from "../entities/like.table";
import { CommentTypes } from "../types/comment";
class CommentRepository {
  async getAllByRoom(sort: any, limit: number, offset: number, idRoom: number) {
    const includeModels: any[] = [
      {
        model: User,
        include: {
          model: Ratting,
          where: {
            roomId: idRoom,
          },
        },
      },
      {
        model: Like,
      },
    ];
    if (sort) {
      return await Comment.findAll({
        offset,
        limit,
        order: [["content", sort]],
        where: {
          roomId: idRoom,
        },
        include: includeModels,
      });
    }
    return await Comment.findAll({
      offset,
      limit,
      where: {
        roomId: idRoom,
      },
      include: includeModels,
    });
  }
  async createComment(newData: any) {
    return await Comment.create(newData);
  }
  async updateComment(id: number, newData: CommentTypes) {
    return await Comment.update({ ...newData }, { where: { id } });
  }
  async removeComment(id: number) {
    return await Comment.destroy({ where: { id } });
  }
}
export default CommentRepository;
