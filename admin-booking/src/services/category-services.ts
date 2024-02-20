import CategoryRepository from "../repositories/category.repository";

class CategoryServices {
  private repository: CategoryRepository;
  constructor() {
    this.repository = new CategoryRepository();
  }
  async getAll() {
    return await this.repository.getAll();
  }
  async addNew(newData: any) {
    return await this.repository.addNew(newData);
  }
  async removeCategory(id: number) {
    return await this.repository.removeCategory(id);
  }
}
export default CategoryServices;
