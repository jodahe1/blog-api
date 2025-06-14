import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Category } from 'src/entities/category.entity';
@Module({
  imports:[MikroOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
