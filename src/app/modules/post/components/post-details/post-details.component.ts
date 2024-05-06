import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post.model';
import { posts } from '../../posts';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  entity: Post;

  constructor(private route: ActivatedRoute) {}

  // 生命周期方法，初始化的时候可以使用
  ngOnInit(): void {
    // 路由参数订阅方法
    // 订阅路由参数发生变化的方法，当路由参数变化的时候，这个箭头函数会被调用，
    // 并且会接收到一个参数params，包含路由参数信息的对象
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id != null) {
        // + convert to number
        const postId = +id;
        console.log(postId);
        // 找到 posts中post.id 与当前postId 相同的post。
        // 使用类型断言（Type Assertion）： 确认赋值不会为 undefined，
        this.entity = posts.find((post) => post.id === postId) as Post;
      } else {
        return;
      }
    });
  }
}
