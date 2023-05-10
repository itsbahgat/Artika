import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
//import { RouterModule } from '@angular/router'
import { BrowserModule } from "@angular/platform-browser";

import { ComponentsModule } from "./components/components.module";
import { ErrorComponent } from "./pages/error/error.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { AboutComponent } from "./pages/about/about.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AppComponent } from "./app.component";

import { FormsModule } from "@angular/forms";
import { TagInputModule } from "ngx-chips";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SellerDashboardComponent } from "./pages/seller-dashboard/seller-dashboard.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { AppRoutingModule } from "./app-routing.module";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AdminLayoutComponent } from "./components/admin-layout/admin-layout.component";
import { DashboardComponent } from "./pages/admin/dashboard/dashboard.component";
import { AllcustomersComponent } from "./pages/admin/allcustomers/allcustomers.component";
import { AllsellersComponent } from "./pages/admin/allsellers/allsellers.component";
import { AllpendingsellersComponent } from "./pages/admin/allpendingsellers/allpendingsellers.component";
import { AllordersComponent } from "./pages/admin/allorders/allorders.component";
import { LoginadminComponent } from "./pages/loginadmin/loginadmin.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "cart",
    loadChildren: () =>
      import("./pages/basket/basket.module").then((m) => m.BasketModule),
  },
  {
    path: "loginuser",
    loadChildren: () =>
      import("./pages/loginuser/loginuser.module").then(
        (m) => m.LoginUserModule
      ),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/register/register.module").then((m) => m.RegisterModule),
  },
  {
    path: "products",
    loadChildren: () =>
      import("./pages/products/products.module").then((m) => m.ProductsModule),
  },
  {
    path: "product/:id",
    loadChildren: () =>
      import("./pages/product/product.module").then((m) => m.ProductModule),
  },
  {
    path: "seller-dashboard",
    component: SellerDashboardComponent,
    children: [
      // { path: '', redirectTo: 'profile' },
      //{ path: 'profile', component: ProfileComponent },
      { path: "add-product", component: AddProductComponent },
    ],
  },
  {
    path: "payment",
    loadChildren: () =>
      import("./pages/pay/pay.module").then((m) => m.PayModule),
  },
  {
    path: "payment",
    loadChildren: () =>
      import("./pages/pay/pay.module").then((m) => m.PayModule),
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      // { path: "login", component: LoginadminComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "dashboard/allcustomers", component: AllcustomersComponent },
      { path: "dashboard/allsellers", component: AllsellersComponent },
      {
        path: "dashboard/allpendingsellers",
        component: AllpendingsellersComponent,
      },
      {
        path: "dashboard/allorders",
        component: AllordersComponent,
      },
    ],
  },
  {
    path: "loginadmin",
    loadChildren: () =>
      import("./pages/loginadmin/loginadmin.module").then(
        (m) => m.LoginAdminModule
      ),
  },
  {
    path: "searchedProducts",
    loadChildren: () =>
      import("./pages/searchedProducts/searchedProducts.module").then(
        (m) => m.ProductsModule
      ),
  },
  { path: "about", component: AboutComponent },
  { path: "profile", component: ProfileComponent },
  { path: "contact", component: ContactComponent },
  { path: "error", component: ErrorComponent },
  { path: "**", redirectTo: "/error" }, // For handling any other routes
];

@NgModule({
  declarations: [AppComponent, AddProductComponent, SellerDashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TagInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ComponentsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
