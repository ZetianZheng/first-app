import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  title = 'Posts';

  entities = [
    { title: 'Hello', body: 'Hello my friend' },
    { title: 'Hola', body: 'Hola my friend' },
    { title: '你好' },
  ];
  constructor() {}

  ngOninit() {}

  removeItem(item: number) {
    console.log('remove item ....');
    // filter 方法是 JavaScript 中用于筛选数组元素的高阶函数之一。它接受一个回调函数作为参数，该回调函数会对数组中的每个元素进行评估，并返回一个布尔值，用于决定是否保留该元素。
    // 在这段代码中，this.entities 是一个数组，filter 方法被调用在 this.entities 上。回调函数接收两个参数：entity 表示当前元素，index 表示当前元素的索引。
    // 在回调函数中，通过比较当前元素的索引 index 和 item，判断是否要保留该元素。如果当前元素的索引不等于 item，则返回 true，表示保留该元素；否则返回 false，表示移除该元素。
    // 最后，filter 方法返回一个新的数组，其中只包含回调函数返回 true 的元素，即移除了索引等于 item 的元素。
    this.entities = this.entities.filter((entity, index) => {
      return index !== item;
    });
  }
}
