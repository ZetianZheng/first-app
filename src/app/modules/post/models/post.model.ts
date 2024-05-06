export class Post {
  // 定义model类， 增加两个属性 title和body
  // 可选： 加？（undefined）
  constructor(public id: number, public title: string, public body?: string) {}
}
