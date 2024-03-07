import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entities';
import { Repository } from 'typeorm';

export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(newDataCategory: any) {
    try {
      return await this.categoryRepository.save(newDataCategory);
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw error;
    }
  }
  async remove(id: number) {
    try {
      return await this.categoryRepository.delete({ id });
    } catch (error) {
      throw error;
    }
  }
}
