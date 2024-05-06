import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './modules/post/post.component';
import { PostDetailsComponent } from './modules/post/components/post-details/post-details.component';

// 定义路由
const routes: Routes = [{ path: 'posts', component: PostComponent }, 
{ path: 'posts/:id', component: PostDetailsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
