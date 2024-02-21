import CategoryRepository from "../repositories/category.repositories";
import { CategoryTypes } from "../types/category";

class CategoryService {
  private repository: CategoryRepository;
  constructor() {
    this.repository = new CategoryRepository();
  }
  async createCategory(newDataRoom: CategoryTypes) {
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
