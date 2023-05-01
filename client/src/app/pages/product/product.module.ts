import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { product } from './product.component'

const routes = [
  {
    path: '',
    component: product,
  },
]

@NgModule({
  declarations: [product],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [product],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductModule {}
