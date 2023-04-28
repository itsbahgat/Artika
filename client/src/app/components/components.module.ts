import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ItemCard } from './item-card/item-card.component'
import { NavbarComponent } from './navbar/navbar.component'
import { FooterComponent } from './footer/footer.component'
import { ItemComponent } from './item/item.component'
import { SectionHeading } from './section-heading/section-heading.component'
import { CategoryCard } from './category-card/category-card.component'
import { BlogPostCard } from './blog-post-card/blog-post-card.component'
import { Cart } from './cart/cart.component';
import { AddProductComponent } from './add-product/add-product.component'

import { FormsModule }   from '@angular/forms';
import { TagInputModule } from 'ngx-chips';



@NgModule({
  declarations: [ItemCard, SectionHeading, CategoryCard, BlogPostCard,ItemComponent ,NavbarComponent ,FooterComponent , Cart, AddProductComponent],
  imports: [CommonModule, RouterModule, FormsModule,TagInputModule],
  exports: [ItemCard, SectionHeading, CategoryCard, BlogPostCard,ItemComponent,NavbarComponent ,FooterComponent , Cart,AddProductComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
