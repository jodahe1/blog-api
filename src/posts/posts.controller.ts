import { Controller,Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from 'src/entities/post.entity';
@Controller('posts')
export class PostsController {
   constructor(private readonly postsService: PostsService) {}

   
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Post()
  async create(
    @Body() body: { title: string; content: string; categoryId: number },
  ): Promise<PostEntity> {
    return this.postsService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { title?: string; content?: string; categoryId?: number },
  ): Promise<PostEntity> {
    return this.postsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.postsService.delete(id);
  }
}
