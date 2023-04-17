import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontLayoutComponent } from './layout/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthAdminLayoutComponent } from './layout/auth-admin-layout/auth-admin-layout.component';

const routes: Routes = [
  {
    path: '', component: FrontLayoutComponent, children: [
      {path:'',loadChildren:()=>import('./views/front/home/home.module').then(m=>m.HomeModule)},
      {path:'userlogin',loadChildren:()=>import('./views/front/loginuser/loginuser.module').then(m=>m.LoginuserModule)},
      {path:'register',loadChildren:()=>import('./views/front/register/register.module').then(m=>m.RegisterModule)},
  ]},
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      { path: '',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule) },
      { path: 'dashboard',loadChildren:()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule) },
      { path: 'adminlogin', loadChildren: () => import('./views/admin/loginadmin/loginadmin.module').then(m => m.LoginadminModule) },
    ]
  },
  {path:'admin/login',component:AuthAdminLayoutComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
