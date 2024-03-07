import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async createCategory(newDataRoom: any) {
    try {
      return await this.categoryRepository.create(newDataRoom);
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      return await this.categoryRepository.getAll();
    } catch (error) {
      throw error;
    }
  }

  async removeCategory(id: number) {
    try {
      return await this.categoryRepository.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
