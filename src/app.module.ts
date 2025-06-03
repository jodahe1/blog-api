import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [ MikroOrmModule.forRoot(),CategoriesModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
