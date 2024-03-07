import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post('add-category')
  async createCategory(@Body() body) {
    try {
      const newDataCategory = {
        name: body.name,
      };
      return await this.categoryService.createCategory(newDataCategory);
    } catch (error) {
      return { msg: 'duple category name', error };
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.categoryService.getAll();
    } catch (error) {
      return { msg: 'Error', error };
    }
  }
  @Delete('remove-category/:id')
  async removeCategory(@Param() params) {
    try {
      const id = Number(params.id);
      return await this.categoryService.removeCategory(id);
    } catch (error) {
      return { msg: 'Error', error };
    }
  }
}
