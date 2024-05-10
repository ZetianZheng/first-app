import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { posts } from '../posts';

// providedIn: root 表示这个服务可以在任意位置使用。
@Injectable({
  providedIn: 'root'
})
export class PostService {
  entities: Post[];
  
  constructor() { 
    this.entities = posts;
  }

  // 返回entities属性
  index() {
    return this.entities;
  }

  // 返回指定的文章内容(id)
  // as Post 表示返回的值肯定是Post不是undefined
  show(id : number) {
    return this.entities.find(entity => entity.id === id) as Post;
  }
}
