# About the Module:
## About the declarations in NgModules:
1. 问题： Angular modules 中，declaration 是什么？请举例说明。  
    回答： declarations 是 NgModule 的一个属性，用于声明当前模块中的组件、指令和管道。通过在 declarations 数组中列出这些项目，可以使它们在当前模块中可用。
2. 问题： declarations 和 imports 的不同？  
    回答： declarations 用于声明当前模块中的组件、指令和管道，而 imports 用于导入其他模块，以便在当前模块中使用这些导入模块所提供的功能。
3. 问题： 为什么一定要用 declarations 声明当前模块的组件、管道和指令？  
   1. 模块封装性： 使用 declarations 可以确保模块的封装性。通过在模块中声明组件、指令和管道，可以明确指定这些功能项只能在当前模块中使用，从而有效地将其封装在模块内部，避免它们被其他模块直接访问和使用，从而增强了模块的独立性和可维护性。
   2. 作用域限定： 通过 declarations，可以限定组件、指令和管道的作用域，使它们只在当前模块内部可用，而不会污染其他模块的命名空间。这样可以避免命名冲突和意外的组件重用，保证了代码的可靠性和稳定性。
   3. 编译优化： Angular 编译器会基于模块的 declarations 属性来优化应用程序的构建过程。只有在模块的 declarations 中声明了组件、指令和管道，编译器才会正确地将它们编译到最终的应用程序包中，从而确保应用程序的体积和性能都得到了优化。
   4. 可读性和维护性： 使用 declarations 可以提高代码的可读性和维护性。通过在模块中明确声明组件、指令和管道，可以清晰地了解当前模块中包含了哪些功能项，使代码结构更加清晰和易于理解，有助于团队协作和项目的长期维护。

## About the Export and Imports: 在另外一个组件调用当前组件：App -> post
正如 src/app/modules/post/post.module.ts 中的 exports: [PostComponent]， 如果觉得当前模块的某个组件或服务要给另一个模块用的，那就导出它。
并在 src/app/app.module.ts 中 增加导入：imports: [BrowserModule, AppRoutingModule, PostModule]。 

src/app/app.component.html:
```html
<h1>{{title}}</h1>
<app-post></app-post>
```

### 为什么是app-post，以及什么是Selector
在src/app/modules/post/post.component.ts 中定义了selector
selector 给组件设个门牌号，当这个组件被使用时，用它来告诉组件所处的位置。


# Components:
## 可以在Components中添加数据：
src/app/modules/post/post.component.ts中；
增加： title = 'Posts';
并更新html， 使用 <h3>{{title}}</h3>， 
可以看到title被display

## 可以在component中添加事件：
src/app/modules/post/post.component.ts中；
```ts
 removeItem() {
    console.log('remove...');
  }
```

src/app/modules/post/post.component.html: 使用 括号绑定事件，括号中表示什么动作会触发什么事件。

```html
<p>
    <button (click)="removeItem()">Remove</button>
</p>
```

# 指令
## NgFor: 循环渲染列表数据
src/app/modules/post/post.component.ts:
```ts
entities = [{ title: 'Hello' }, { title: 'Hola' }, { title: '你好' }];  
```

src/app/modules/post/post.component.html:

```html
<ul>
    <li *ngFor="let entity of entities">
        <h4>{{entity.title}}</h4>
    </li>
</ul>
```

## NgIf: 判断该数据是否存在，存在则渲染。

src/app/modules/post/post.component.ts:

```ts
entities = [
    { title: 'Hello', body: 'Hello my friend' },
    { title: 'Hola', body: 'Hola my friend' },
    { title: '你好' },
  ];
```

src/app/modules/post/post.component.html:

```html
 <p *ngIf="entity.body">{{entity.body}}s</p>
 ```

## @Input and @Output
@Input 用于从父组件向子组件传递数据，让父组件能够把数据绑定到子组件的属性上。
@Output 用于从子组件向父组件传递数据，让子组件能够触发事件并向父组件传递数据。

子组件： 
可以通过outputEvent.emit() 触发事件像父组件传递数据
```ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'child-component',
  template: `
    <p> {{inputValue}} </p>
    <button (click)="onButtonClick()">Click me!</button>
  `
})
export class ChildComponent {
  @Input() inputValue: string;
  @Output() outputEvent: EventEmitter<string> = new EventEmitter();

  onButtonClick() {
    this.outputEvent.emit('Data from child component');
  }
}

```
父组件：
通过inputValue的将parentValue的数据传递给子组件。

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'parent-component',
  template: `
    <child-component [inputValue]="parentValue" (outputEvent)="handleOutputEvent($event)"></child-component>
  `
})
export class ParentComponent {
  parentValue = 'Data from parent component';

  handleOutputEvent(data: string) {
    console.log('Received data in parent component:', data);
  }
}

```

# HTML
## 属性绑定：
src/app/modules/post/post.component.html:
可以使用方括号：
title="{{entity.title}} 
等价为[title]="entity.title"

<h4><a [title]="entity.title" [textContent]="entity.title"></a></h4>
[textContent]="entity.title" 等价为在标签中直接写值： {{entity.title}}

# Directive 指令
ng-xxxx, 最常用做html标签

# Router
AppRoutingModule 定义路由，  
在src/app/app-routing.module.ts 中可以增加路由定义：
```ts
const routes: Routes = [{ path: 'posts', component: PostComponent }];
```

在src/app/app.component.html中将 
```html
<app-post></app-post>
```
替换成
```html
<router-outlet></router-outlet>
```
从而输出路由定义的组件内容。
http://localhost:4200/ 
除了标题就不会有组件的内容；

但是如果访问： http://localhost:4200/posts
即可看到标题 + 定义的路由组件：post component

## 给访问列表详情页 http://localhost:4200/posts/1
生成新的component： ng generate component modules/post/components/post-details
在src/app/app-routing.module.ts 添加新的路由： { path: 'posts/:id', component: PostDetailsComponent }];

在src/app/modules/post/components/post-item/post-item.component.html 中添加，[routerLink] = "['/posts', entity.id]"  后，所有的列表title都带上超链接，可以重定向到相关的页面上

### 超链传值： 那么超链之后，如何获得对应数据的值？
比如说，去第一个超链获得所有Hello相关的信息？
1. 导入ActivatedRoute
2. 使用
 ```ts
  // 路由参数订阅方法
    // 订阅路由参数发生变化的方法，当路由参数变化的时候，这个箭头函数会被调用，
    // 并且会接收到一个参数params，包含路由参数信息的对象
    this.route.paramMap.subscribe((params) => {
```

# 服务