import { Controller,Get,Post,Put,Body,Param,Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from 'src/entities/category.entity';
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Get()
    async findall():Promise<Category[]>{

        return this.categoriesService.findall();
    }
    @Get(':id')
   async findone(@Param('id') id:number): Promise<Category | null>{
        return this.categoriesService.findbyId(id)
    }

  @Post()
  async create(@Body() body: { name: string }): Promise<Category> {
    return this.categoriesService.create(body.name);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: { name: string }): Promise<Category> {
    return this.categoriesService.update(id, body.name);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    return this.categoriesService.delete(id);
  }
}
