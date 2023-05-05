import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'

import { ComponentsModule } from './components/components.module'
import { ErrorComponent } from './pages/error/error.component';
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

/*hello*/
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
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./pages/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./pages/pay/pay.module').then((m) => m.PayModule),
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' } // For handling any other routes
  
];


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), ComponentsModule ,HttpClientModule, BrowserAnimationsModule, FormsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
