import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Post } from './post.entity';

@Entity()
export class Category {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(()=>Post,(post)=>post.category)
  posts=new Collection<Post>(this)
}