import { Op } from "sequelize";
import Like from "../entities/like.table";

class LikeRepository {
  async addNewLike(newData: any) {
    return Like.create(newData);
  }
  async removeLike(id: number) {
    return Like.destroy({ where: { id } });
  }
  async findLike(commentId: number, userId: number) {
    return Like.findOne({
      where: {
        [Op.and]: [{ commentId }, { userId }],
      },
    });
  }
}
export default LikeRepository;
