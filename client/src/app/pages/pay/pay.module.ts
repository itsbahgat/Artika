import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { pay } from './pay.component'




const routes = [
  {
    path: '',
    component: pay,
  },
]

@NgModule({
  declarations: [pay],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [pay],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PayModule {}
