import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

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
import { CategoryComponent } from "./categories/categories.component";

import { BrowserModule } from "@angular/platform-browser";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { ProductTableComponent } from "./product-table/product-table.component";
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
    CategoryComponent,
    AdminLayoutComponent,
    EditProductComponent,
    ProductTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TagInputModule,
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatCardModule,
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
    CategoryComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}

