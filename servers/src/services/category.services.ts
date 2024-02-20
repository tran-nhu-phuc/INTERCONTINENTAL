import CategoryRepository from "../repositories/category.repositories";

class CategoryService {
  private repository: CategoryRepository;
  constructor() {
    this.repository = new CategoryRepository();
  }
  async createCategory(newDataRoom: any) {
    return await this.repository.createCategory(newDataRoom);
  }
  async getAll() {
    return await this.repository.getAll();
  }
  async removeCategory(id: number) {
    return await this.repository.removeCategory(id);
  }
}
export default CategoryService;
