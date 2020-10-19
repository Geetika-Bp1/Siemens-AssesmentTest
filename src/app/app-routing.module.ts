  
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { HomeComponent } from './home' ;
import { DepartmentComponent } from './department';
import { EmployeeComponent } from './employee';
import { AuthGuard } from './_helpers';
import{ SelfserviceComponent } from './selfservice'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  // {
  //   path: 'Login',
  //   component: LoginComponent
  // },
  {
    path: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Department',
    component: DepartmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path :'Selfservice',
    component : SelfserviceComponent,
    canActivate: [AuthGuard]
  },
  // otherwise redirect to Login
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }