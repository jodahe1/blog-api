import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from 'src/entities/post.entity';
import { Category } from 'src/entities/category.entity';
@Module({
  imports:[MikroOrmModule.forFeature([Post,Category])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
