import LikeRepository from "../repositories/like.repositories";

class LikeService {
  private repository: LikeRepository;
  constructor() {
    this.repository = new LikeRepository();
  }
  async addNewLike(newData: any) {
    const result = await this.repository.findLike(
      newData.commentId,
      newData.userId
    );
    if (result === null) {
      return await this.repository.addNewLike(newData);
    } else {
      return await this.repository.removeLike(result?.dataValues?.id);
    }
  }
  async removeLike(id: number) {
    return await this.repository.removeLike(id);
  }
}
export default LikeService;
