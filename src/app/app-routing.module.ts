import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {AdminComponent} from './components/admin/admin.component';
import {UserComponent} from './components/user/user.component';

const routes: Routes = [
  {path : '' , redirectTo : '/home' , pathMatch : 'full'},
  {path : 'home' , component : HomeComponent},
  {path : 'register' , component : RegisterComponent},
  {path : 'login' , component : LoginComponent},
  {path : 'admin' , component : AdminComponent},
  {path : 'User/:id' , component : UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
