import LikeRepository from "../repositories/like-repositories";

class LikeService {
  private likeRepository: LikeRepository;
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async addNewLike(userId: number, commentId: number) {
    return await this.likeRepository.addNewLike(userId, commentId);
  }
  async removeLike(id: number) {
    return await this.likeRepository.removeLike(id);
  }
}

export default LikeService;
