import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ItemCard } from './item-card/item-card.component'
import { NavbarComponent } from './navbar/navbar.component'
import { FooterComponent } from './footer/footer.component'
import { ItemComponent } from './item/item.component'
import { SectionHeading } from './section-heading/section-heading.component'
import { CategoryCard } from './category-card/category-card.component'
import { BlogPostCard } from './blog-post-card/blog-post-card.component'
import { Cart } from './cart/cart.component';
import { AddProductComponent } from './add-product/add-product.component'


import { TagInputModule } from 'ngx-chips';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { commentComponent } from './comment/comment.component';
import { PaymentComponent } from './payment/payment.component'


@NgModule({
  declarations: [ItemCard, SectionHeading, CategoryCard, BlogPostCard,ItemComponent ,NavbarComponent ,FooterComponent , Cart , commentComponent, PaymentComponent],
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    TagInputModule,
    //MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  exports: [ItemCard, SectionHeading, CategoryCard, BlogPostCard,ItemComponent,NavbarComponent ,FooterComponent , Cart , commentComponent, PaymentComponent,
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
