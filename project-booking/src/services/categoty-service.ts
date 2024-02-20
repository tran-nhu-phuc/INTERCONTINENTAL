import CategoryRepository from "../repositories/category-repositories";

class CategoryService {
  private categoryRepository: any;
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }
  async getAll() {
    return await this.categoryRepository.getAll();
  }
}

export default CategoryService;
