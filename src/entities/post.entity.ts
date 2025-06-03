import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Category } from './category.entity';

@Entity()
export class Post {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  content!: string;

  @Property({onCreate:()=>new Date()})
  createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt? = new Date();

  @ManyToOne(()=>Category)
  category!:Category
}