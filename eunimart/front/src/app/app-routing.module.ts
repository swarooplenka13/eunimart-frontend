import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserdComponent } from './userd/userd.component';

const routes: Routes = [
  {
    path:'user' ,component: UserComponent
   },
   {
     path: '', redirectTo: '/user', pathMatch: 'full'
   },
   {
    path:"users/:id" ,component:UserdComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
