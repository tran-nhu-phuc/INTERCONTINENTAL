import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entities';
import { Room } from 'src/entities/rooms.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Room])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
})
export class CategoriesModule {}
