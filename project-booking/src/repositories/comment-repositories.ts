import ApiService from "../api/api-services";

class CommentRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async addNewComment(newData: any) {
    try {
      return await this.apiService.post(
        "/api/v1/comments/add-comment",
        newData
      );
    } catch (error) {
      throw error;
    }
  }
  async getAllByRoom(id: number) {
    try {
      return await this.apiService.get(
        `/api/v1/comments/get-all-comment/${id}/?limit=10000`
      );
    } catch (error) {
      throw error;
    }
  }
  async removeComment(id: number) {
    try {
      return await this.apiService.delete(
        "/api/v1/comments/remove-comment",
        id
      );
    } catch (error) {
      throw error;
    }
  }
}
export default CommentRepository;
