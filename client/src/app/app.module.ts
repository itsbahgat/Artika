import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'

import { ComponentsModule } from './components/components.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/basket/basket.module').then((m) => m.BasketModule),
  },
  {
    path: 'loginuser',
    loadChildren: () =>
      import('./pages/loginuser/loginuser.module').then((m) => m.LoginUserModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
];


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), ComponentsModule ,HttpClientModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
