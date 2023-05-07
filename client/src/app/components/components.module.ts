import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ROUTES, Router, RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { ItemCard } from "./item-card/item-card.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { ItemComponent } from "./item/item.component";
import { SectionHeading } from "./section-heading/section-heading.component";
import { CategoryCard } from "./category-card/category-card.component";
import { BlogPostCard } from "./blog-post-card/blog-post-card.component";
import { Cart } from "./cart/cart.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";

import { TagInputModule } from "ngx-chips";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

import { commentComponent } from "./comment/comment.component";
import { PaymentComponent } from "./payment/payment.component";

import { BrowserModule } from "@angular/platform-browser";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ItemCard,
    SectionHeading,
    CategoryCard,
    BlogPostCard,
    ItemComponent,
    NavbarComponent,
    FooterComponent,
    Cart,
    commentComponent,
    PaymentComponent,
    AdminLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TagInputModule,
    //MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatCardModule,
    FormsModule,
  ],
  exports: [
    ItemCard,
    SectionHeading,
    CategoryCard,
    BlogPostCard,
    ItemComponent,
    NavbarComponent,
    FooterComponent,
    Cart,
    commentComponent,
    PaymentComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
