import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { basket } from './basket.component'




const routes = [
  {
    path: '',
    component: basket,
  },
]

@NgModule({
  declarations: [basket],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [basket],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BasketModule {}
