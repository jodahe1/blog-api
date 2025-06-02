import { Injectable } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
    private readonly em: EntityManager,
  ) {}

  async findall(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async findbyId(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOne(id);
  }
  async create(name: string): Promise<Category> {
    const category = this.categoryRepository.create({ name });
    await this.em.persistAndFlush(category);
    return category;
  }

  async update(id: number, name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new Error('Category not Found');
    }
    category.name = name;
   await  this.em.flush();
    return category;
  }
  async delete(id: number): Promise<string> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new Error('Category not Found');
    }
    await this.em.removeAndFlush(category);
    return 'Removed';
  }
}
