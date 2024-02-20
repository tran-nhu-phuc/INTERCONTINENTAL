import ApiService from "../api/api-services";
class CategoryRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAll() {
    return await this.apiService.get("/api/v1/categories");
  }
  async addNew(newData: any) {
    return await this.apiService.post(
      "/api/v1/categories/add-category",
      newData
    );
  }
  async removeCategory(id: number) {
    return await this.apiService.delete(
      "/api/v1/categories/remove-category",
      id
    );
  }
}
export default CategoryRepository;
