import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { FillComponent } from './fill/fill.component';
import { RegisterComponent } from './register/register.component';
import { ShowdataComponent } from './showdata/showdata.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {path:'register', component: RegisterComponent},
  {path:'showdata', component: FillComponent},
  {path:'fill',component:ShowdataComponent},
  {path:'home', component: StartComponent},
  {path:'', pathMatch:'full', redirectTo:'home'}, 
  {path:'filldata',component:CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
