import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css',
})
export class PostItemComponent {
  // 使用input可以从外部传递给子组件数据。
  @Input()
  // 引入Post 类作为entity属性
  entity : Post;

  @Output()
  // 创建一个外部可以监听的事件
  // 通过订阅这个事件，其他组件可以监听并响应这个事件
  remove = new EventEmitter();

  constructor() {}
  
  onClick(entity: Post) {
    // emit方法被调用时，所有订阅了这个emitter的观察者都会被通知，并收到传递的值
    this.remove.emit(entity);
  }

}
