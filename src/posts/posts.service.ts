import { Injectable } from '@nestjs/common';
import { Post } from 'src/entities/post.entity';
import { EntityRepository,EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Category } from 'src/entities/category.entity';
import { populate } from 'dotenv';
@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository:EntityRepository<Post>,
        @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
        private readonly em:EntityManager
    ){}

    
  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll(populate['category']);
  }

async findOne(id: number): Promise<Post> {
  const post = await this.postRepository.findOne(id, {
    populate:['category'],
  });

  if (!post) {
    throw new Error('Post not found');
  }

  return post;
}




  async create(postData: { title: string; content: string; categoryId: number }): Promise<Post> {
    const category = await this.categoryRepository.findOne(postData.categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    const post = this.postRepository.create({
      title: postData.title,
      content: postData.content,
      category,
    });
    await this.em.persistAndFlush(post);
    return post;
  }

  async update(
    id: number,
    postData: { title?: string; content?: string; categoryId?: number },
  ): Promise<Post> {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new Error('Post not found');
    }

    if (postData.title) post.title = postData.title;
    if (postData.content) post.content = postData.content;

    if (postData.categoryId) {
      const category = await this.categoryRepository.findOne(postData.categoryId);
      if (!category) {
        throw new Error('Category not found');
      }
      post.category = category;
    }

    await this.em.flush();
    return post;
  }

  async delete(id: number): Promise<void> {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new Error('Post not found');
    }
    await this.em.removeAndFlush(post);
  }

}
