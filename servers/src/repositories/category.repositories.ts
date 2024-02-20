import Category from "../entities/category.table";

class CategoryRepository {
  async createCategory(newDataCategory: any) {
    return await Category.create(newDataCategory);
  }
  async getAll() {
    return await Category.findAll();
  }
  async removeCategory(id: number) {
    return await Category.destroy({ where: { id } });
  }
}
export default CategoryRepository;
