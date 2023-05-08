import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Orders } from './orders.component'




const routes = [
  {
    path: '',
    component: Orders,
  },
]

@NgModule({
  declarations: [Orders],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Orders],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersModule {}
