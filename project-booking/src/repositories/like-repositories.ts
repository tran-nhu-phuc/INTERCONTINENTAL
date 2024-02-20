import ApiService from "../api/api-services";

class LikeRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async addNewLike(userId: number, commentId: number) {
    return await this.apiService.post(`/api/v1/likes/add-like`, {
      userId,
      commentId,
    });
  }
  async removeLike(id: number) {
    return await this.apiService.delete("/api/v1/likes/remove-like", id);
  }
}
export default LikeRepository;
