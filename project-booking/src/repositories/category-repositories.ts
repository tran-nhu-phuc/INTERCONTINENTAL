import ApiService from "../api/api-services";

class CategoryRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAll() {
    return await this.apiService.get("/api/v1/categories");
  }
}
export default CategoryRepository;
